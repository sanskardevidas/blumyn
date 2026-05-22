"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Coupon } from "@/types/coupon";

type CouponContextType = {
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  clearCoupons: () => void;
  getCouponByCode: (code: string) => Coupon | undefined;
};

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export function CouponProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const storedCoupons = localStorage.getItem("blumyn_coupons");
    if (storedCoupons) {
      setCoupons(JSON.parse(storedCoupons));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blumyn_coupons", JSON.stringify(coupons));
  }, [coupons]);

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.code !== code));
  };

  const clearCoupons = () => {
    setCoupons([]);
  };

  const getCouponByCode = (code: string) => {
    return coupons.find(
      (coupon) => coupon.code.toLowerCase() === code.toLowerCase()
    );
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,
        addCoupon,
        deleteCoupon,
        clearCoupons,
        getCouponByCode,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupons() {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error("useCoupons must be used within a CouponProvider");
  }

  return context;
}