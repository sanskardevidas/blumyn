"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useShopFilters } from "@/context/ShopFilterContext";

const flowOptions = ["Light", "Medium", "Heavy"];
const sizeOptions = ["Regular", "XL", "XXL", "Overnight", "Combo Pack"];
const priceOptions = ["100-300", "301-600"];

export default function ShopSearchBar() {
  const [showFilters, setShowFilters] = useState(false);

  const {
    search,
    setSearch,
    flowTypes,
    setFlowTypes,
    sizes,
    setSizes,
    priceRanges,
    setPriceRanges,
    clearFilters,
  } = useShopFilters();

  const activeCount = flowTypes.length + sizes.length + priceRanges.length;

  const toggleItem = (
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 -z-20 rounded-[2.5rem] bg-[radial-gradient(circle_at_14%_10%,rgba(255,226,236,0.9),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(226,208,245,0.88),transparent_34%),linear-gradient(135deg,#FFF9FB_0%,#FFF4F8_42%,#F8F0FF_100%)] blur-2xl" />

      <div className="rounded-[2.2rem] border border-white/70 bg-white/45 p-3 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="relative flex h-[56px] w-1/4 items-center justify-center rounded-full border border-white/70 bg-white/78 text-[#6F3E8F] shadow-[0_16px_38px_rgba(122,92,158,0.1)] backdrop-blur-xl transition-all duration-300 active:scale-95"
            aria-label="Open filters"
          >
            <SlidersHorizontal size={20} />

            {activeCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6F3E8F] px-1 text-[10px] font-semibold text-white shadow-lg">
                {activeCount}
              </span>
            )}
          </button>

          <div className="relative w-3/4">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70537C]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-[56px] w-full rounded-full border border-white/70 bg-white/78 py-3 pl-11 pr-4 text-sm text-[#70537C] shadow-[0_16px_38px_rgba(122,92,158,0.1)] outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#D4B9E7] focus:bg-white"
            />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#70537C]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-[62px] w-full rounded-full border border-white/70 bg-white/78 py-3 pl-14 pr-5 text-sm text-[#70537C] shadow-[0_18px_42px_rgba(122,92,158,0.1)] outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#D4B9E7] focus:bg-white"
          />
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-[#2B1E35]/55 backdrop-blur-md lg:hidden">
          <div className="absolute inset-x-0 bottom-0 max-h-[84vh] overflow-y-auto rounded-t-[2rem] border border-white/40 bg-[#FFF9FB]/96 p-5 shadow-[0_-25px_80px_rgba(43,30,53,0.28)] backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between border-b border-[#E6D6F2] pb-4">
              <div>
                <p className="text-xl text-[#553268]">Filters</p>

                <p className="text-xs text-[#70537C]">
                  Refine products for your comfort
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-full border border-white/70 bg-white/80 p-2 text-[#6F3E8F] shadow-md transition-all duration-300 hover:rotate-90 hover:scale-110"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl text-[#553268]">Filter Products</h3>

              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-[#6F3E8F] hover:underline"
              >
                Clear
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-4 text-sm font-semibold text-[#553268]">
                Flow Type
              </p>

              <div className="space-y-3">
                {flowOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-[#70537C] shadow-[0_10px_30px_rgba(91,54,113,0.06)]"
                  >
                    <input
                      type="checkbox"
                      checked={flowTypes.includes(option)}
                      onChange={() =>
                        toggleItem(option, flowTypes, setFlowTypes)
                      }
                      className="accent-[#6F3E8F]"
                    />

                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-4 text-sm font-semibold text-[#553268]">
                Size
              </p>

              <div className="space-y-3">
                {sizeOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-[#70537C] shadow-[0_10px_30px_rgba(91,54,113,0.06)]"
                  >
                    <input
                      type="checkbox"
                      checked={sizes.includes(option)}
                      onChange={() => toggleItem(option, sizes, setSizes)}
                      className="accent-[#6F3E8F]"
                    />

                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-[#553268]">
                Price
              </p>

              <div className="space-y-3">
                {priceOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-[#70537C] shadow-[0_10px_30px_rgba(91,54,113,0.06)]"
                  >
                    <input
                      type="checkbox"
                      checked={priceRanges.includes(option)}
                      onChange={() =>
                        toggleItem(option, priceRanges, setPriceRanges)
                      }
                      className="accent-[#6F3E8F]"
                    />

                    {option === "100-300"
                      ? "₹100 - ₹300"
                      : "₹301 - ₹600"}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="mt-7 w-full rounded-full bg-[#6F3E8F] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}