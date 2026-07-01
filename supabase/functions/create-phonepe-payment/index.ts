import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { pendingOrderId } = await req.json();

    if (!pendingOrderId) {
      throw new Error("Missing pendingOrderId");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const phonepeClientId = Deno.env.get("PHONEPE_CLIENT_ID");
    const phonepeClientSecret = Deno.env.get("PHONEPE_CLIENT_SECRET");
    const phonepeClientVersion = Deno.env.get("PHONEPE_CLIENT_VERSION") || "1";
    const siteUrl = Deno.env.get("SITE_URL") || "https://www.blumyn.shop";

    if (
      !supabaseUrl ||
      !supabaseServiceRoleKey ||
      !phonepeClientId ||
      !phonepeClientSecret
    ) {
      throw new Error("Missing required server secrets");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: pendingOrder, error: pendingError } = await supabase
      .from("pending_orders")
      .select("id,amount,payload,user_id")
      .eq("id", pendingOrderId)
      .single();

    if (pendingError || !pendingOrder) {
      throw new Error("Pending order not found");
    }

    const amountInPaise = Math.round(Number(pendingOrder.amount) * 100);

    if (!amountInPaise || amountInPaise <= 0) {
      throw new Error("Invalid payment amount");
    }

    const merchantOrderId = `BLUMYN_${String(pendingOrder.id).replaceAll(
      "-",
      ""
    )}_${Date.now()}`;

    const tokenResponse = await fetch(
      "https://api.phonepe.com/apis/identity-manager/v1/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: phonepeClientId,
          client_version: phonepeClientVersion,
          client_secret: phonepeClientSecret,
          grant_type: "client_credentials",
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("PhonePe token error:", tokenData);
      throw new Error("Failed to authenticate with PhonePe");
    }

    const email =
      pendingOrder?.payload?.profile?.email ||
      pendingOrder?.payload?.email ||
      "";

    const paymentPayload = {
      merchantOrderId,
      amount: amountInPaise,
      expireAfter: 1200,
      metaInfo: {
        udf1: pendingOrder.id,
        udf2: email,
        udf3: "Blumyn Order",
      },
      paymentFlow: {
        type: "PG_CHECKOUT",
        message: "Payment for Blumyn order",
        merchantUrls: {
          redirectUrl: `${siteUrl}/payment-status?pending_order_id=${pendingOrder.id}&merchant_order_id=${merchantOrderId}`,
        },
      },
    };

    const paymentResponse = await fetch(
      "https://api.phonepe.com/apis/pg/checkout/v2/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify(paymentPayload),
      }
    );

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error("PhonePe payment error:", paymentData);

      await supabase
        .from("pending_orders")
        .update({
          payment_status: "failed",
        })
        .eq("id", pendingOrder.id);

      throw new Error(
        paymentData?.message || "Failed to create PhonePe payment"
      );
    }

    const redirectUrl =
      paymentData?.redirectUrl ||
      paymentData?.data?.instrumentResponse?.redirectInfo?.url ||
      paymentData?.data?.redirectUrl;

    if (!redirectUrl) {
      console.error("Missing PhonePe redirect URL:", paymentData);

      await supabase
        .from("pending_orders")
        .update({
          payment_status: "failed",
        })
        .eq("id", pendingOrder.id);

      throw new Error("PhonePe did not return payment URL");
    }

    await supabase
      .from("pending_orders")
      .update({
        merchant_order_id: merchantOrderId,
        payment_status: "pending",
      })
      .eq("id", pendingOrder.id);

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: redirectUrl,
        pendingOrderId: pendingOrder.id,
        merchantOrderId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("create-phonepe-payment error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating payment",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});