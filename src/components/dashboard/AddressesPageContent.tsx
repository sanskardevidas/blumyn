"use client";

import { useEffect, useState } from "react";
import {
  Home,
  MapPin,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import AccountSidebar from "@/components/dashboard/AccountSidebar";
import { supabase } from "@/lib/supabaseClient";

type AddressType = "Home" | "Office" | "Other";

type Address = {
  id: string;
  fullName: string;
  phone: string;
  house: string;
  street: string;
  city: string;
  district: string;
  state: string;
  landmark: string;
  pinCode: string;
  addressType: AddressType;
};

export default function AddressesPageContent() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [addressType, setAddressType] =
    useState<AddressType>("Home");

  const fetchAddresses = async () => {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching addresses:", error);
      setLoading(false);
      return;
    }

    const mappedAddresses: Address[] = (data || []).map(
      (address) => ({
        id: address.id,
        fullName: address.full_name ?? "",
        phone: address.phone ?? "",
        house: address.address_line_1 ?? "",
        street: address.address_line_2 ?? "",
        city: address.city ?? "",
        district: address.city ?? "",
        state: address.state ?? "",
        landmark: address.landmark ?? "",
        pinCode: address.pincode ?? "",
        addressType:
          (address.address_type as AddressType) || "Home",
      })
    );

    setAddresses(mappedAddresses);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("addresses").insert({
      user_id: null,
      full_name: fullName,
      phone,
      address_line_1: house,
      address_line_2: street,
      city,
      state,
      pincode: pinCode,
      landmark,
      is_default: false,
      address_type: addressType,
    });

    if (error) {
      console.error("Error saving address:", error);
      return;
    }

    setFullName("");
    setPhone("");
    setHouse("");
    setStreet("");
    setCity("");
    setDistrict("");
    setState("");
    setLandmark("");
    setPinCode("");
    setAddressType("Home");
    setShowForm(false);

    fetchAddresses();
  };

  const removeAddress = async (id: string) => {
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error removing address:", error);
      return;
    }

    setAddresses((prev) =>
      prev.filter((address) => address.id !== id)
    );
  };

  const clearAddresses = async () => {
    const { error } = await supabase
      .from("addresses")
      .delete()
      .not("id", "is", null);

    if (error) {
      console.error("Error clearing addresses:", error);
      return;
    }

    setAddresses([]);
  };

  const inputClass =
    "h-14 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white";

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-20">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr]">
        <AccountSidebar />

        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-8 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <MapPin size={26} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                    My Account
                  </p>

                  <h1 className="text-4xl leading-tight text-[#553268]">
                    Saved Addresses
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                    Manage delivery locations for faster checkout and a smoother
                    Blumyn experience.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full bg-[#6F3E8F] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  {showForm ? <X size={17} /> : <Plus size={17} />}
                  {showForm ? "Close Form" : "Add New"}
                </button>

                {addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAddresses}
                    className="flex items-center gap-2 rounded-full border border-[#D4B9E7] bg-white/70 px-5 py-3 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:border-[#6F3E8F] hover:bg-[#6F3E8F] hover:text-white"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:grid-cols-2"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="text"
                placeholder="House / Flat Number"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="text"
                placeholder="Street / Area"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="text"
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="text"
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className={inputClass}
              />

              <input
                type="text"
                placeholder="PIN Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
                className={inputClass}
              />

              <select
                value={addressType}
                onChange={(e) =>
                  setAddressType(
                    e.target.value as "Home" | "Office" | "Other"
                  )
                }
                className={inputClass}
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#6F3E8F] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              Loading saved addresses...
            </div>
          ) : addresses.length === 0 ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              No saved addresses yet. Add one to see it here.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                        <Home size={22} />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-[#553268]">
                          {address.addressType}
                        </h3>

                        <p className="mt-1 text-sm text-[#70537C]">
                          {address.fullName}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeAddress(address.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B9E7] bg-white/70 text-[#6F3E8F] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="relative rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
                    <p className="text-sm leading-8 text-[#70537C]">
                      {address.fullName}
                      <br />
                      {address.phone}
                      <br />
                      {address.house}, {address.street}
                      <br />
                      {address.city}, {address.district}
                      <br />
                      {address.state} - {address.pinCode}
                      <br />
                      {address.landmark ? (
                        <>Landmark: {address.landmark}</>
                      ) : null}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}