"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Order } from "@/types/order";

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDER_STORAGE_KEY = "blumyn_orders";

function normalizeOrder(order: any): Order {
  return {
    id: order?.id ?? crypto.randomUUID(),
    items: Array.isArray(order?.items) ? order.items : [],
    profile: {
      fullName: order?.profile?.fullName ?? "",
      email: order?.profile?.email ?? "",
      phone: order?.profile?.phone ?? "",
    },
    address: {
      id: order?.address?.id ?? "",
      fullName: order?.address?.fullName ?? "",
      phone: order?.address?.phone ?? "",
      house: order?.address?.house ?? "",
      street: order?.address?.street ?? "",
      city: order?.address?.city ?? "",
      district: order?.address?.district ?? "",
      state: order?.address?.state ?? "",
      landmark: order?.address?.landmark ?? "",
      pinCode: order?.address?.pinCode ?? "",
      addressType: order?.address?.addressType ?? "Home",
    },
    subtotal: typeof order?.subtotal === "number" ? order.subtotal : 0,
    discount: typeof order?.discount === "number" ? order.discount : 0,
    shipping: typeof order?.shipping === "number" ? order.shipping : 0,
    total:
      typeof order?.total === "number"
        ? order.total
        : Math.max(
            (typeof order?.subtotal === "number" ? order.subtotal : 0) +
              (typeof order?.shipping === "number" ? order.shipping : 0) -
              (typeof order?.discount === "number" ? order.discount : 0),
            0
          ),
    appliedCoupon: order?.appliedCoupon ?? null,
    status:
      order?.status === "Processing" ||
      order?.status === "Shipped" ||
      order?.status === "Delivered"
        ? order.status
        : "Processing",
    createdAt: order?.createdAt ?? new Date().toISOString(),
  };
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);

    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        setOrders(Array.isArray(parsed) ? parsed.map(normalizeOrder) : []);
      } catch {
        setOrders([]);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }

  return context;
}