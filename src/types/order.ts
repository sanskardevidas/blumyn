export type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type OrderProfile = {
  fullName: string;
  email: string;
  phone: string;
};

export type OrderAddress = {
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
  addressType: "Home" | "Office" | "Other";
};

export type AppliedCouponSnapshot = {
  code: string;
  type: "percentage" | "flat";
  value: number;
  discountAmount: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  profile: OrderProfile;
  address: OrderAddress;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedCoupon: AppliedCouponSnapshot | null;
  status: "Processing" | "Shipped" | "Delivered";
  createdAt: string;
};