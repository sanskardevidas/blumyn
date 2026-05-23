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
  state: string;
  pincode: string;
  landmark: string | null;
  is_default?: boolean | null;
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
  const [addressType, setAddressType] = useState<"Home" | "Office" | "Other">(
    "Home"
  );

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const shipping = cartItems.length > 0 ? 50 : 0;
  const safeDiscount = Math.min(discountAmount, subtotal);
  const total = Math.max(subtotal + shipping - safeDiscount, 0);

  const inputClass =
    "h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white";

  const isUuid = (value: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingAddresses(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) setEmail(user.email);

      if (!user) {
        setLoadingAddresses(false);
        return;
      }

      const { data, error } = await supabase
        .from("addresses")
        .select(
          "id, full_name, phone, address_line_1, address_line_2, city, state, pincode, landmark, is_default"
        )
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching addresses:", error.message);
        setLoadingAddresses(false);
        return;
      }

      const fetchedAddresses = (data || []) as Address[];
      setAddresses(fetchedAddresses);

      if (fetchedAddresses.length > 0) {
        fillAddress(fetchedAddresses[0]);
        setSelectedAddressId(fetchedAddresses[0].id);
      }

      setLoadingAddresses(false);
    };

    fetchInitialData();
  }, []);

  const fillAddress = (addr: Address) => {
    setFullName(addr.full_name || "");
    setPhone(addr.phone || "");
    setHouse(addr.address_line_1 || "");
    setStreet(addr.address_line_2 || "");
    setCity(addr.city || "");
    setDistrict(addr.city || "");
    setState(addr.state || "");
    setLandmark(addr.landmark || "");
    setPinCode(addr.pincode || "");
    setAddressType("Home");
  };

  const handleAddressChange = (id: string) => {
    setSelectedAddressId(id);
    const addr = addresses.find((a) => a.id === id);
    if (addr) fillAddress(addr);
  };

  const markAsNewAddress = () => {
    if (selectedAddressId) setSelectedAddressId("");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0 || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Please login before placing an order.");
      }

      const userEmail = user.email || email;

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullName,
        email: userEmail,
        phone,
        updated_at: new Date().toISOString(),
      });

      if (profileError) throw profileError;

      let finalAddressId = selectedAddressId;

      if (!finalAddressId) {
        const { data: addressData, error: addressError } = await supabase
          .from("addresses")
          .insert({
            user_id: user.id,
            full_name: fullName,
            phone,
            address_line_1: house,
            address_line_2: street || null,
            city,
            state,
            pincode: pinCode,
            landmark: landmark || null,
            is_default: addresses.length === 0,
          })
          .select("id")
          .single();

        if (addressError || !addressData) {
          throw addressError || new Error("Failed to save address.");
        }

        finalAddressId = addressData.id;
      }

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          address_id: finalAddressId,
          subtotal,
          discount: safeDiscount,
          total,
          coupon_code: appliedCoupon?.code || null,
          coupon_type: appliedCoupon?.type || null,
          coupon_value: appliedCoupon?.value || null,
          coupon_discount_amount: appliedCoupon ? safeDiscount : 0,
          status: "pending",
        })
        .select("id, created_at")
        .single();

      if (orderError || !orderData) {
        throw orderError || new Error("Failed to create order.");
      }

      const itemsPayload = cartItems.map((item: any) => ({
        order_id: orderData.id,
        product_id: isUuid(String(item.id)) ? String(item.id) : null,
        product_name: item.name,
        product_price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
        size: item.size || null,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsPayload);

      if (itemsError) throw itemsError;

      addOrder({
        id: orderData.id,
        items: cartItems,
        profile: {
          fullName,
          email: userEmail,
          phone,
        },
        address: {
          id: finalAddressId,
          fullName,
          phone,
          house,
          street,
          city,
          district,
          state,
          landmark,
          pinCode,
          addressType,
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
        createdAt: orderData.created_at || new Date().toISOString(),
      });

      clearCart();
      clearCoupon();
      setOrderPlaced(true);
    } catch (error: any) {
      console.error("Order placement error:", error);
      setSubmitError(
        error?.message || "Failed to place order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/72 p-8 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:p-10">
        <div className="relative">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
            <CheckCircle size={30} />
          </div>

          <h2 className="mb-4 text-3xl text-[#553268]">
            Order placed successfully 💜
          </h2>

          <p className="text-base leading-8 text-[#70537C]">
            Your order is now saved in Supabase and will appear in the admin
            dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:p-8"
    >
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

        {loadingAddresses ? (
          <p className="mb-6 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 py-4 text-sm text-[#70537C]">
            Loading saved addresses...
          </p>
        ) : addresses.length > 0 ? (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-[#553268]">
              Use Saved Address
            </label>

            <select
              value={selectedAddressId}
              onChange={(e) => handleAddressChange(e.target.value)}
              className={inputClass}
            >
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.full_name}, {address.address_line_1}, {address.city}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              markAsNewAddress();
            }}
            required
          />

          <input
            className={inputClass}
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              markAsNewAddress();
            }}
            required
          />

          <input
            className={`${inputClass} md:col-span-2`}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className={inputClass}
            placeholder="House / Flat / Building"
            value={house}
            onChange={(e) => {
              setHouse(e.target.value);
              markAsNewAddress();
            }}
            required
          />

          <input
            className={inputClass}
            placeholder="Street / Area"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              markAsNewAddress();
            }}
          />

          <input
            className={inputClass}
            placeholder="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              markAsNewAddress();
            }}
            required
          />

          <input
            className={inputClass}
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

          <input
            className={inputClass}
            placeholder="State"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              markAsNewAddress();
            }}
            required
          />

          <input
            className={inputClass}
            placeholder="Pin Code"
            value={pinCode}
            onChange={(e) => {
              setPinCode(e.target.value);
              markAsNewAddress();
            }}
            required
          />

          <input
            className={`${inputClass} md:col-span-2`}
            placeholder="Landmark"
            value={landmark}
            onChange={(e) => {
              setLandmark(e.target.value);
              markAsNewAddress();
            }}
          />
        </div>

        <div className="mt-6">
          <label className="mb-3 block text-sm font-semibold text-[#553268]">
            Address Type
          </label>

          <div className="flex flex-wrap gap-3">
            {["Home", "Office", "Other"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAddressType(type as any)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  addressType === type
                    ? "border-[#6F3E8F] bg-[#6F3E8F] text-white"
                    : "border-[#E6D6F2] bg-white/80 text-[#70537C] hover:bg-[#FFF8FC]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {submitError && (
          <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || cartItems.length === 0}
          className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#6F3E8F] text-sm font-bold text-white shadow-[0_18px_45px_rgba(111,62,143,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5E347A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <PackageCheck size={18} />
          {submitting ? "Placing Order..." : `Place Order ₹${total}`}
        </button>
      </div>
    </form>
  );
}