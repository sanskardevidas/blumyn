export type Subscription = {
  id: string;
  planName: string;
  productName: string;
  frequency: string;
  status: "Active" | "Paused" | "Cancelled";
  nextDelivery: string;
  createdAt: string;
};