"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Subscription } from "@/types/subscription";

type SubscriptionContextType = {
  subscriptions: Subscription[];
  addSubscription: (data: {
    planName: string;
    productName: string;
    frequency: string;
  }) => void;
  pauseSubscription: (id: string) => void;
  resumeSubscription: (id: string) => void;
  cancelSubscription: (id: string) => void;
  clearSubscriptions: () => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

const STORAGE_KEY = "blumyn_subscriptions";

function getNextDeliveryDate() {
  const next = new Date();
  next.setMonth(next.getMonth() + 2);
  return next.toISOString();
}

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSubscriptions(JSON.parse(saved));
      } catch {
        setSubscriptions([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  }, [subscriptions, hydrated]);

  const addSubscription = ({
    planName,
    productName,
    frequency,
  }: {
    planName: string;
    productName: string;
    frequency: string;
  }) => {
    const newSubscription: Subscription = {
      id: `SUB-${Date.now()}`,
      planName,
      productName,
      frequency,
      status: "Active",
      nextDelivery: getNextDeliveryDate(),
      createdAt: new Date().toISOString(),
    };

    setSubscriptions((prev) => [newSubscription, ...prev]);
  };

  const pauseSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "Paused" } : sub
      )
    );
  };

  const resumeSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "Active" } : sub
      )
    );
  };

  const cancelSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "Cancelled" } : sub
      )
    );
  };

  const clearSubscriptions = () => {
    setSubscriptions([]);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        pauseSubscription,
        resumeSubscription,
        cancelSubscription,
        clearSubscriptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscriptions must be used within a SubscriptionProvider"
    );
  }

  return context;
}