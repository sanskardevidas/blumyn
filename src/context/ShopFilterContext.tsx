"use client";

import { createContext, useContext, useState } from "react";

type ShopFilterContextType = {
  search: string;
  setSearch: (value: string) => void;
  flowTypes: string[];
  setFlowTypes: (value: string[]) => void;
  sizes: string[];
  setSizes: (value: string[]) => void;
  priceRanges: string[];
  setPriceRanges: (value: string[]) => void;
  clearFilters: () => void;
};

const ShopFilterContext = createContext<ShopFilterContextType | undefined>(
  undefined
);

export function ShopFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [flowTypes, setFlowTypes] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);

  const clearFilters = () => {
    setSearch("");
    setFlowTypes([]);
    setSizes([]);
    setPriceRanges([]);
  };

  return (
    <ShopFilterContext.Provider
      value={{
        search,
        setSearch,
        flowTypes,
        setFlowTypes,
        sizes,
        setSizes,
        priceRanges,
        setPriceRanges,
        clearFilters,
      }}
    >
      {children}
    </ShopFilterContext.Provider>
  );
}

export function useShopFilters() {
  const context = useContext(ShopFilterContext);

  if (!context) {
    throw new Error(
      "useShopFilters must be used within a ShopFilterProvider"
    );
  }

  return context;
}