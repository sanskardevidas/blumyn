"use client";

import { useState } from "react";
import {
  PackagePlus,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useProducts } from "@/context/ProductContext";

export default function AdminProductsContent() {
  const { products, addProduct, deleteProduct, clearProducts } = useProducts();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Pads");
  const [flowType, setFlowType] = useState<"Light" | "Medium" | "Heavy">(
    "Medium"
  );
  const [sizes, setSizes] = useState("");
  const [featured, setFeatured] = useState(false);
  const [subscriptionEligible, setSubscriptionEligible] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    addProduct({
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      name,
      shortDescription,
      description,
      price: Number(price),
      category,
      flowType,
      sizes: sizes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      featured,
      subscriptionEligible,
    });

    setName("");
    setSlug("");
    setShortDescription("");
    setDescription("");
    setPrice("");
    setCategory("Pads");
    setFlowType("Medium");
    setSizes("");
    setFeatured(false);
    setSubscriptionEligible(true);
    setShowForm(false);
  };

  const inputClass =
    "h-14 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white";

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-20">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr]">
        <AdminSidebar />

        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-8 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <PackagePlus size={26} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                    Admin Panel
                  </p>

                  <h1 className="text-4xl leading-tight text-[#553268]">
                    Products Management
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                    Add, manage, delete, and organize Blumyn products,
                    categories, sizes, flow type, and subscription eligibility.
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
                  {showForm ? "Close Form" : "Add Product"}
                </button>

                {products.length > 0 && (
                  <button
                    type="button"
                    onClick={clearProducts}
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
              onSubmit={handleAddProduct}
              className="grid gap-5 rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:grid-cols-2"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className={inputClass}
                required
              />

              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Slug (optional)"
                className={inputClass}
              />

              <input
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Short Description"
                className={`${inputClass} md:col-span-2`}
                required
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Full Description"
                className="rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 py-4 text-sm leading-7 text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white md:col-span-2"
                rows={4}
                required
              />

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className={inputClass}
                required
              />

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className={inputClass}
                required
              />

              <select
                value={flowType}
                onChange={(e) =>
                  setFlowType(e.target.value as "Light" | "Medium" | "Heavy")
                }
                className={inputClass}
              >
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Heavy">Heavy</option>
              </select>

              <input
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="Sizes (comma separated)"
                className={inputClass}
                required
              />

              <label className="flex h-14 items-center gap-3 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm font-semibold text-[#70537C]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="accent-[#6F3E8F]"
                />
                Featured
              </label>

              <label className="flex h-14 items-center gap-3 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm font-semibold text-[#70537C]">
                <input
                  type="checkbox"
                  checked={subscriptionEligible}
                  onChange={(e) => setSubscriptionEligible(e.target.checked)}
                  className="accent-[#6F3E8F]"
                />
                Subscription Eligible
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#6F3E8F] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  Save Product
                </button>
              </div>
            </form>
          )}

          {products.length === 0 ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              No products available.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {products.map((product) => {
                const safeSizes = Array.isArray(product.sizes)
                  ? product.sizes
                  : [];

                return (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
                  >
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                    <div className="relative mb-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                          <Sparkles size={22} />
                        </div>

                        <div>
                          <p className="text-xl font-semibold text-[#553268]">
                            {product.name}
                          </p>

                          <p className="text-xs text-[#70537C]">
                            {product.category} · {product.flowType}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteProduct(product.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B9E7] bg-white/70 text-[#6F3E8F] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
                        aria-label="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="relative space-y-3 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4 text-sm text-[#70537C]">
                      <p>
                        Price:{" "}
                        <span className="font-semibold text-[#553268]">
                          ₹{product.price}
                        </span>
                      </p>

                      <p>
                        Sizes:{" "}
                        <span className="font-semibold text-[#553268]">
                          {safeSizes.length > 0
                            ? safeSizes.join(", ")
                            : "Regular"}
                        </span>
                      </p>

                      <p>
                        Subscription Eligible:{" "}
                        <span className="font-semibold text-[#553268]">
                          {product.subscriptionEligible ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}