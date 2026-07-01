"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Order } from "@/types/order";
import { supabase } from "@/lib/supabaseClient";

type OrderContextType = {
  orders: Order[];
  loading: boolean;
  refreshOrders: () => Promise<void>;
  addOrder: (order: Order) => void;
  clearOrders: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDER_STORAGE_KEY = "blumyn_orders";

type SupabaseOrder = {
  id: string;
  user_id: string | null;
  address_id: string | null;
  subtotal: number;
  discount: number;
  total: number;
  coupon_code: string | null;
  coupon_type: "percentage" | "flat" | null;
  coupon_value: number | null;
  coupon_discount_amount: number | null;
  status: string;
  payment_status: string | null;
  created_at: string;
};

type SupabaseOrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_price: number;
  quantity: number;
  size: string | null;
};

type SupabaseAddress = {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  pincode: string;
  landmark: string | null;
};

type SupabaseProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
};

function mapStatus(status: string): Order["status"] {
  switch (status) {
    case "pending":
      return "Processing";

    case "confirmed":
      return "Processing";

    case "packed":
      return "Processing";

    case "shipped":
    case "out_for_delivery":
      return "Shipped";

    case "delivered":
      return "Delivered";

    case "cancelled":
      return "Processing"; // We won't show these anyway because of the payment_status filter

    default:
      return "Processing";
  }
}

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
      addressType:
        order?.address?.addressType === "Office" ||
        order?.address?.addressType === "Other"
          ? order.address.addressType
          : "Home",
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

function mapSupabaseOrderToOrder(params: {
  order: SupabaseOrder;
  items: SupabaseOrderItem[];
  profile: SupabaseProfile | null;
  address: SupabaseAddress | null;
}): Order {
  const { order, items, profile, address } = params;

  const subtotal = Number(order.subtotal || 0);
  const discount = Number(order.discount || 0);
  const total = Number(order.total || 0);
  const shipping = Math.max(total - subtotal + discount, 0);

  return {
    id: order.id,
    items: items.map((item) => ({
      id: Number(String(item.id).replace(/\D/g, "").slice(0, 9)) || Date.now(),
      name: item.product_name,
      price: Number(item.product_price || 0),
      quantity: Number(item.quantity || 1),
      image: undefined,
    })),
    profile: {
      fullName: profile?.full_name || address?.full_name || "",
      email: profile?.email || "",
      phone: profile?.phone || address?.phone || "",
    },
    address: {
      id: address?.id || "",
      fullName: address?.full_name || profile?.full_name || "",
      phone: address?.phone || profile?.phone || "",
      house: address?.address_line_1 || "",
      street: address?.address_line_2 || "",
      city: address?.city || "",
      district: address?.city || "",
      state: address?.state || "",
      landmark: address?.landmark || "",
      pinCode: address?.pincode || "",
      addressType: "Home",
    },
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon: order.coupon_code
      ? {
          code: order.coupon_code,
          type: order.coupon_type || "flat",
          value: Number(order.coupon_value || 0),
          discountAmount: Number(order.coupon_discount_amount || discount),
        }
      : null,
    status: mapStatus(order.status),
    createdAt: order.created_at,
  };
}

function getLocalOrders(): Order[] {
  try {
    const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!savedOrders) return [];

    const parsed = JSON.parse(savedOrders);
    return Array.isArray(parsed) ? parsed.map(normalizeOrder) : [];
  } catch {
    return [];
  }
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshOrders = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const localOrders = getLocalOrders();
        setOrders(localOrders);
        setLoading(false);
        return;
      }

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(
          "id,user_id,address_id,subtotal,discount,total,coupon_code,coupon_type,coupon_value,coupon_discount_amount,status,payment_status,created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([]));
        setLoading(false);
        return;
      }

      const paidOrdersData = (ordersData as SupabaseOrder[]).filter(
        (order) =>
          order.payment_status === "paid" ||
        order.payment_status === "success"
      );
      
      const orderIds = paidOrdersData.map((order) => order.id);
      const addressIds = paidOrdersData
        .map((order) => order.address_id)
        .filter(Boolean) as string[];

      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("id,order_id,product_id,product_name,product_price,quantity,size")
        .in("order_id", orderIds);

      if (itemsError) throw itemsError;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("id,full_name,email,phone")
        .eq("id", user.id)
        .maybeSingle();

      let addressesData: SupabaseAddress[] = [];

      if (addressIds.length > 0) {
        const { data: fetchedAddresses, error: addressesError } = await supabase
          .from("addresses")
          .select(
            "id,full_name,phone,address_line_1,address_line_2,city,state,pincode,landmark"
          )
          .in("id", addressIds);

        if (addressesError) throw addressesError;

        addressesData = (fetchedAddresses || []) as SupabaseAddress[];
      }

      const mappedOrders = paidOrdersData.map((order) => {
        const orderItems = ((itemsData || []) as SupabaseOrderItem[]).filter(
          (item) => item.order_id === order.id
        );

        const orderAddress =
          addressesData.find((address) => address.id === order.address_id) ||
          null;

        return mapSupabaseOrderToOrder({
          order,
          items: orderItems,
          profile: (profileData as SupabaseProfile | null) || null,
          address: orderAddress,
        });
      });

      setOrders(mappedOrders);
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(mappedOrders));
    } catch (error) {
      console.error("OrderContext Supabase fetch error:", error);

      const localOrders = getLocalOrders();
      setOrders(localOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  const addOrder = (order: Order) => {
    const normalized = normalizeOrder(order);

    setOrders((prev) => {
      const exists = prev.some((item) => item.id === normalized.id);
      const nextOrders = exists
        ? prev.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...prev];

      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(nextOrders));
      return nextOrders;
    });
  };

  const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem(ORDER_STORAGE_KEY);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        refreshOrders,
        addOrder,
        clearOrders,
      }}
    >
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