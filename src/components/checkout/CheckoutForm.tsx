"use client";

import { useEffect, useState } from "react";
import type { Coupon } from "@/types/coupon";
import { CheckCircle, MapPin, PackageCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { supabase } from "@/lib/supabaseClient";

type CheckoutFormProps = {
  appliedCoupon: Coupon | null;
  discountAmount: number;
  clearCoupon: () => void;
};

type Address = {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  district: string | null;
  state: string;
  pincode: string;
  landmark: string | null;
  address_type: string | null;
};

export default function CheckoutForm({
  appliedCoupon,
  discountAmount,
  clearCoupon,
}: CheckoutFormProps) {
  const { cartItems, clearCart, subtotal } = useCart();
  const { addOrder } = useOrders();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [addressType, setAddressType] = useState("Home");

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const shipping = cartItems.length > 0 ? 50 : 0;
  const safeDiscount = Math.min(discountAmount, subtotal);
  const total = Math.max(subtotal + shipping - safeDiscount, 0);

  useEffect(() => {
    const fetchAddresses = async () => {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching addresses:", error);
        setLoadingAddresses(false);
        return;
      }

      const fetchedAddresses = (data || []) as Address[];
      setAddresses(fetchedAddresses);

      if (fetchedAddresses.length > 0) {
        const first = fetchedAddresses[0];

        setSelectedAddressId(first.id);
        setFullName(first.full_name || "");
        setPhone(first.phone || "");
        setHouse(first.address_line_1 || "");
        setStreet(first.address_line_2 || "");
        setCity(first.city || "");
        setDistrict(first.district || "");
        setState(first.state || "");
        setLandmark(first.landmark || "");
        setPinCode(first.pincode || "");
        setAddressType(first.address_type || "Home");
      }

      setLoadingAddresses(false);
    };

    fetchAddresses();
  }, []);

  const handleAddressChange = (id: string) => {
    setSelectedAddressId(id);

    const addr = addresses.find((a) => a.id === id);
    if (!addr) return;

    setFullName(addr.full_name || "");
    setPhone(addr.phone || "");
    setHouse(addr.address_line_1 || "");
    setStreet(addr.address_line_2 || "");
    setCity(addr.city || "");
    setDistrict(addr.district || "");
    setState(addr.state || "");
    setLandmark(addr.landmark || "");
    setPinCode(addr.pincode || "");
    setAddressType(addr.address_type || "Home");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0 || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          subtotal,
          discount: safeDiscount,
          total,
          coupon_code: appliedCoupon?.code || null,
          coupon_type: appliedCoupon?.type || null,
          coupon_value: appliedCoupon?.value || null,
          coupon_discount_amount: appliedCoupon ? safeDiscount : null,
          status: "pending",
          email,
        })
        .select("id")
        .single();

      if (orderError || !orderData) {
        throw orderError || new Error("Failed to create order");
      }

      const itemsPayload = cartItems.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        size: null,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsPayload);

      if (itemsError) {
        throw itemsError;
      }

      addOrder({
        id: orderData.id,
        items: cartItems,
        profile: {
          fullName,
          email,
          phone,
        },
        address: {
          id: selectedAddressId || `manual-${Date.now()}`,
          fullName,
          phone,
          house,
          street,
          city,
          district,
          state,
          landmark,
          pinCode,
          addressType: addressType as any,
        },
        subtotal,
        discount: safeDiscount,
        shipping,
        total,
        appliedCoupon: appliedCoupon
          ? {
              code: appliedCoupon.code,
              type: appliedCoupon.type,
              value: appliedCoupon.value,
              discountAmount: safeDiscount,
            }
          : null,
        status: "Processing",
        createdAt: new Date().toISOString(),
      });

      clearCart();
      clearCoupon();
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order placement error:", error);
      setSubmitError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white";

  if (orderPlaced) {
    return (
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/72 p-8 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:p-10">
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#F7E7F2] blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
            <CheckCircle size={30} />
          </div>

          <h2 className="mb-4 text-3xl text-[#553268]">
            Order placed successfully 💜
          </h2>

          <p className="text-base leading-8 text-[#70537C]">
            Thank you for choosing Blumyn. Your order has been placed
            successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:p-8">
      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />
      <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-[#FFEAC7]/40 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
            <MapPin size={24} />
          </div>

          <div>
            <h2 className="text-3xl leading-tight text-[#553268]">
              Shipping Details
            </h2>
            <p className="mt-1 text-sm text-[#70537C]">
              Add your delivery address for discreet doorstep delivery.
            </p>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          {loadingAddresses ? (
            <div className="rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC] p-4 text-sm text-[#70537C]">
              Loading saved addresses...
            </div>
          ) : addresses.length > 0 ? (
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                Choose Saved Address
              </label>

              <select
                value={selectedAddressId}
                onChange={(e) => handleAddressChange(e.target.value)}
                className={inputClass}
              >
                {addresses.map((addr) => (
                  <option key={addr.id} value={addr.id}>
                    {addr.full_name} - {addr.city}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#553268]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                House / Flat Number
              </label>
              <input
                type="text"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                Street / Area
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                District
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                Landmark
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#553268]">
                PIN Code
              </label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#553268]">
              Address Type
            </label>

            <select
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
              className={inputClass}
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {submitError && (
            <div className="rounded-[1.2rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={cartItems.length === 0 || submitting}
            className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white transition-all duration-300 ${
              cartItems.length > 0 && !submitting
                ? "bg-[#6F3E8F] shadow-[0_20px_45px_rgba(111,62,143,0.25)] hover:-translate-y-1 hover:bg-[#5E347A]"
                : "cursor-not-allowed bg-[#DCCBE8]"
            }`}
          >
            <PackageCheck size={18} />
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}