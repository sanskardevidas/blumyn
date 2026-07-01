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

    const { orderId, merchantOrderId } = await req.json();

    if (!orderId || !merchantOrderId) {
      throw new Error("Missing orderId or merchantOrderId");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const phonepeClientId = Deno.env.get("PHONEPE_CLIENT_ID")!;
    const phonepeClientSecret = Deno.env.get("PHONEPE_CLIENT_SECRET")!;
    const phonepeClientVersion = Deno.env.get("PHONEPE_CLIENT_VERSION") || "1";
    const phonepeEnv = Deno.env.get("PHONEPE_ENV") || "production";

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const isProduction = phonepeEnv.toLowerCase() === "production";

    const tokenUrl = isProduction
      ? "https://api.phonepe.com/apis/identity-manager/v1/oauth/token"
      : "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";

    const statusUrl = isProduction
      ? `https://api.phonepe.com/apis/pg/checkout/v2/order/${merchantOrderId}/status?details=true&errorContext=true`
      : `https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/${merchantOrderId}/status?details=true&errorContext=true`;

    const tokenResponse = await fetch(tokenUrl, {
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
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("PhonePe token error:", tokenData);
      throw new Error("Failed to authenticate with PhonePe");
    }

    const statusResponse = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${tokenData.access_token}`,
      },
    });

    const statusData = await statusResponse.json();

    if (!statusResponse.ok) {
      console.error("PhonePe status error:", statusData);
      throw new Error(
        statusData?.message || "Failed to check PhonePe payment status"
      );
    }

    const phonepeState =
      statusData?.state ||
      statusData?.data?.state ||
      statusData?.orderState ||
      statusData?.data?.orderState ||
      "";

    const normalizedState = String(phonepeState).toUpperCase();

    let paymentStatus = "pending";
    let orderStatus = "pending";
    let paidAt: string | null = null;

    if (
      normalizedState === "COMPLETED" ||
      normalizedState === "SUCCESS" ||
      normalizedState === "PAID"
    ) {
      paymentStatus = "success";
      orderStatus = "confirmed";
      paidAt = new Date().toISOString();
    } else if (
      normalizedState === "FAILED" ||
      normalizedState === "CANCELLED" ||
      normalizedState === "CANCELED" ||
      normalizedState === "EXPIRED"
    ) {
      paymentStatus = "failed";
      orderStatus = "payment_failed";
    }

    const transactionId =
      statusData?.paymentDetails?.[0]?.transactionId ||
      statusData?.data?.paymentDetails?.[0]?.transactionId ||
      statusData?.transactionId ||
      merchantOrderId;

    const updatePayload: Record<string, unknown> = {
      payment_method: "phonepe",
      payment_gateway: "phonepe",
      payment_status: paymentStatus,
      transaction_id: transactionId,
      status: orderStatus,
      updated_at: new Date().toISOString(),
    };

    if (paidAt) {
      updatePayload.confirmed_at = paidAt;
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update(updatePayload)
      .eq("id", orderId)
      .eq("transaction_id", merchantOrderId);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      throw new Error("Failed to update order payment status");
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentStatus,
        orderStatus,
        phonepeState: normalizedState,
        transactionId,
        raw: statusData,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("check-phonepe-payment error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while checking payment status",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});