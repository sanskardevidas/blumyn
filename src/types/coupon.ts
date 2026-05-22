export type Coupon = {
  id: string;
  code: string;
  type: "percentage" | "flat";
  value: number;
  active: boolean;
};