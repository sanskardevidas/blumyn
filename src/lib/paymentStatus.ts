export type PaymentViewStatus =
  | "checking"
  | "success"
  | "failed"
  | "pending"
  | "missing"
  | "error";

export function getPaymentMessage(status: PaymentViewStatus) {
  if (status === "success") {
    return {
      title: "Payment Successful",
      description: "Your Blumyn order has been confirmed successfully.",
      button: "View My Orders",
      href: "/account/orders",
    };
  }

  if (status === "failed") {
    return {
      title: "Payment Failed",
      description: "Your payment could not be completed. Please try again.",
      button: "Retry Checkout",
      href: "/checkout",
    };
  }

  if (status === "pending") {
    return {
      title: "Payment Pending",
      description:
        "Your payment status is still pending. Please check again after a few minutes.",
      button: "View My Orders",
      href: "/account/orders",
    };
  }

  if (status === "missing") {
    return {
      title: "Invalid Payment Link",
      description: "Required payment details are missing from this page.",
      button: "Go to Shop",
      href: "/shop",
    };
  }

  if (status === "error") {
    return {
      title: "Something Went Wrong",
      description: "We could not verify your payment right now.",
      button: "Go to Shop",
      href: "/shop",
    };
  }

  return {
    title: "Checking Payment",
    description: "Please wait while we verify your payment.",
    button: "Please Wait",
    href: "#",
  };
}