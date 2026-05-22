"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { SavedAddress } from "@/types/address";

type AddressContextType = {
  addresses: SavedAddress[];
  addAddress: (address: Omit<SavedAddress, "id">) => void;
  removeAddress: (id: string) => void;
  clearAddresses: () => void;
};

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const ADDRESS_STORAGE_KEY = "blumyn_addresses";

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch {
        setAddresses([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses, hydrated]);

  const addAddress = (address: Omit<SavedAddress, "id">) => {
    const newAddress: SavedAddress = {
      id: `ADDR-${Date.now()}`,
      ...address,
    };

    setAddresses((prev) => [newAddress, ...prev]);
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const clearAddresses = () => {
    setAddresses([]);
  };

  return (
    <AddressContext.Provider
      value={{ addresses, addAddress, removeAddress, clearAddresses }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddresses() {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddresses must be used within an AddressProvider");
  }

  return context;
}