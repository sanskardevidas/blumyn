"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import {
  getPaymentMessage,
  type PaymentViewStatus,
} from "@/lib/paymentStatus";

type VerifyResponse = {
  success?: boolean;
  paymentStatus?: string;
  orderStatus?: string;
  phonepeState?: string;
  transactionId?: string;
  error?: string;
};

export default function PaymentStatusPage() {
  const { clearCart } = useCart();
  const { refreshOrders } = useOrders();

  const [status, setStatus] = useState<PaymentViewStatus>("checking");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [merchantOrderId, setMerchantOrderId] = useState("");

  const verifiedOnce = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const currentOrderId = params.get("order_id") || "";
    const currentMerchantOrderId = params.get("merchant_order_id") || "";

    setOrderId(currentOrderId);
    setMerchantOrderId(currentMerchantOrderId);

    if (!currentOrderId || !currentMerchantOrderId) {
      setStatus("missing");
      return;
    }

    if (verifiedOnce.current) return;
    verifiedOnce.current = true;

    const verifyPayment = async () => {
      try {
        setStatus("checking");

        const { data, error } =
          await supabase.functions.invoke<VerifyResponse>(
            "check-phonepe-payment",
            {
              body: {
                orderId: currentOrderId,
                merchantOrderId: currentMerchantOrderId,
              },
            }
          );

        if (error) {
          throw error;
        }

        if (!data?.success) {
          setErrorMessage(data?.error || "Payment verification failed.");
          setStatus("error");
          return;
        }

        const paymentStatus = String(data.paymentStatus || "").toLowerCase();
        const phonepeState = String(data.phonepeState || "").toLowerCase();

        if (
          paymentStatus === "success" ||
          paymentStatus === "paid" ||
          phonepeState === "completed" ||
          phonepeState === "success"
        ) {
          clearCart();
          await refreshOrders();
          setStatus("success");
          return;
        }

        if (
          paymentStatus === "failed" ||
          phonepeState === "failed" ||
          phonepeState === "cancelled" ||
          phonepeState === "canceled" ||
          phonepeState === "expired"
        ) {
          setStatus("failed");
          return;
        }

        setStatus("pending");
      } catch (error: any) {
        console.error("Payment verification error:", error);
        setErrorMessage(
          error?.message || "Unable to verify your payment right now."
        );
        setStatus("error");
      }
    };

    verifyPayment();
  }, [clearCart, refreshOrders]);

  const content = useMemo(() => getPaymentMessage(status), [status]);

  const icon = useMemo(() => {
    if (status === "checking") {
      return <Loader2 className="h-12 w-12 animate-spin" />;
    }

    if (status === "success") {
      return <CheckCircle2 className="h-12 w-12" />;
    }

    if (status === "failed") {
      return <XCircle className="h-12 w-12" />;
    }

    if (status === "pending") {
      return <Clock className="h-12 w-12" />;
    }

    return <AlertCircle className="h-12 w-12" />;
  }, [status]);

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(247,231,242,0.95),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(230,214,242,0.75),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

        <div className="w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 p-8 text-center shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl md:p-12">
          <div
            className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${
              status === "success"
                ? "bg-green-50 text-green-600"
                : status === "failed"
                ? "bg-red-50 text-red-600"
                : status === "pending"
                ? "bg-yellow-50 text-yellow-600"
                : "bg-[#F7E7F2] text-[#6F3E8F]"
            }`}
          >
            {icon}
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
            Blumyn Payment
          </p>

          <h1 className="mb-4 text-4xl font-semibold text-[#553268] md:text-5xl">
            {content.title}
          </h1>

          <p className="mx-auto mb-6 max-w-xl text-sm leading-7 text-[#70537C] md:text-base">
            {content.description}
          </p>

          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {(orderId || merchantOrderId) && (
            <div className="mb-8 rounded-2xl border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5 text-left text-xs text-[#70537C]">
              {orderId && (
                <p className="mb-2">
                  <span className="font-semibold text-[#553268]">
                    Order ID:
                  </span>{" "}
                  {orderId}
                </p>
              )}

              {merchantOrderId && (
                <p>
                  <span className="font-semibold text-[#553268]">
                    Payment Ref:
                  </span>{" "}
                  {merchantOrderId}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {status !== "checking" && (
              <Link
                href={content.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6F3E8F] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(111,62,143,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5E347A]"
              >
                <ShoppingBag size={17} />
                {content.button}
              </Link>
            )}

            {status !== "checking" && (
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-[#DCCBE8] bg-white/80 px-7 py-3 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:bg-[#F7E7F2]"
              >
                Continue Shopping
              </Link>
            )}
          </div>

          {status === "checking" && (
            <p className="mt-6 text-xs text-[#70537C]">
              Please do not close this page.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}