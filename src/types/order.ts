export type OrderLifecycleStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type UserOrderStatus = "Processing" | "Shipped" | "Delivered";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "pay_later";

export type PaymentMethod =
  | "upi"
  | "card"
  | "cod"
  | "pay_later"
  | "unknown";

export type OrderItem = {
  id: number;
  productId?: string | null;
  name: string;
  price: number;
  quantity: number;
  size?: string | null;
  image?: string;
};

export type OrderProfile = {
  id?: string | null;
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

export type OrderTimeline = {
  placedAt: string;
  confirmedAt?: string | null;
  packedAt?: string | null;
  shippedAt?: string | null;
  outForDeliveryAt?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
  refundedAt?: string | null;
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

  /**
   * User-facing simplified status.
   * Existing UI can keep using this without breaking.
   */
  status: UserOrderStatus;

  /**
   * Real admin/database lifecycle status.
   */
  lifecycleStatus?: OrderLifecycleStatus;

  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;

  trackingNumber?: string | null;
  courierName?: string | null;
  adminNote?: string | null;

  timeline?: OrderTimeline;

  createdAt: string;
  updatedAt?: string | null;
};