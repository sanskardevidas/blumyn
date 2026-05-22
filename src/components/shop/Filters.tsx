"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useShopFilters } from "@/context/ShopFilterContext";

const flowOptions = ["Light", "Medium", "Heavy"];
const sizeOptions = ["Regular", "XL", "XXL", "Overnight", "Combo Pack"];
const priceOptions = ["100-300", "301-600"];

export default function Filters() {
  const [open, setOpen] = useState(false);

  const {
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

  const filterContent = (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl text-[#553268]">Filters</h3>

        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-semibold text-[#6F3E8F] hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="mb-6">
        <p className="mb-4 text-sm font-semibold text-[#553268]">Flow Type</p>

        <div className="space-y-3">
          {flowOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 rounded-2xl border border-[#E6D6F2] bg-white/70 px-4 py-3 text-sm text-[#70537C] transition-all duration-300 hover:bg-white"
            >
              <input
                type="checkbox"
                checked={flowTypes.includes(option)}
                onChange={() => toggleItem(option, flowTypes, setFlowTypes)}
                className="accent-[#6F3E8F]"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-4 text-sm font-semibold text-[#553268]">Size</p>

        <div className="space-y-3">
          {sizeOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 rounded-2xl border border-[#E6D6F2] bg-white/70 px-4 py-3 text-sm text-[#70537C] transition-all duration-300 hover:bg-white"
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
        <p className="mb-4 text-sm font-semibold text-[#553268]">Price</p>

        <div className="space-y-3">
          {priceOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 rounded-2xl border border-[#E6D6F2] bg-white/70 px-4 py-3 text-sm text-[#70537C] transition-all duration-300 hover:bg-white"
            >
              <input
                type="checkbox"
                checked={priceRanges.includes(option)}
                onChange={() =>
                  toggleItem(option, priceRanges, setPriceRanges)
                }
                className="accent-[#6F3E8F]"
              />
              {option === "100-300" ? "₹100 - ₹300" : "₹301 - ₹600"}
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div id="filters" className="mb-5 block lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3.5 text-sm font-semibold text-[#6F3E8F] shadow-[0_16px_38px_rgba(122,92,158,0.1)] backdrop-blur-xl transition-all duration-300 active:scale-95"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={17} />
            Filter Products
          </span>

          {activeCount > 0 && (
            <span className="rounded-full bg-[#6F3E8F] px-2.5 py-1 text-xs text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <aside className="hidden h-fit rounded-[2rem] border border-white/70 bg-white/58 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl lg:block">
        {filterContent}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#2B1E35]/55 backdrop-blur-md lg:hidden">
          <div className="absolute inset-x-0 bottom-0 max-h-[84vh] overflow-y-auto rounded-t-[2rem] border border-white/40 bg-[#FFF9FB]/96 p-5 shadow-[0_-25px_80px_rgba(43,30,53,0.28)] backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between border-b border-[#E6D6F2] pb-4">
              <div>
                <p className="text-xl text-[#553268]">Filter Products</p>
                <p className="text-xs text-[#70537C]">
                  Choose options and apply filters
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/70 bg-white/80 p-2 text-[#6F3E8F] shadow-md transition-all duration-300 hover:rotate-90"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            {filterContent}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-7 w-full rounded-full bg-[#6F3E8F] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:bg-[#5E347A]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}