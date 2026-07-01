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

    const { pendingOrderId, merchantOrderId } = await req.json();

    if (!pendingOrderId || !merchantOrderId) {
      throw new Error("Missing pendingOrderId or merchantOrderId");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const phonepeClientId = Deno.env.get("PHONEPE_CLIENT_ID");
    const phonepeClientSecret = Deno.env.get("PHONEPE_CLIENT_SECRET");
    const phonepeClientVersion = Deno.env.get("PHONEPE_CLIENT_VERSION") || "1";
    const phonepeEnv = Deno.env.get("PHONEPE_ENV") || "production";

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
      .select("id,user_id,amount,payload,merchant_order_id,payment_status")
      .eq("id", pendingOrderId)
      .eq("merchant_order_id", merchantOrderId)
      .single();

    if (pendingError || !pendingOrder) {
      throw new Error("Pending order not found");
    }

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

    const transactionId =
      statusData?.paymentDetails?.[0]?.transactionId ||
      statusData?.data?.paymentDetails?.[0]?.transactionId ||
      statusData?.transactionId ||
      merchantOrderId;

    const payload = pendingOrder.payload || {};
    const address = payload.address || {};
    const profile = payload.profile || {};
    const coupon = payload.coupon || {};
    const cartItems = Array.isArray(payload.cartItems) ? payload.cartItems : [];

    if (
      normalizedState === "COMPLETED" ||
      normalizedState === "SUCCESS" ||
      normalizedState === "PAID"
    ) {
      const { data: existingOrder } = await supabase
        .from("orders")
        .select("id")
        .eq("transaction_id", merchantOrderId)
        .maybeSingle();

      if (existingOrder?.id) {
        await supabase
          .from("pending_orders")
          .update({ payment_status: "paid" })
          .eq("id", pendingOrder.id);

        return new Response(
          JSON.stringify({
            success: true,
            paymentStatus: "paid",
            orderStatus: "confirmed",
            phonepeState: normalizedState,
            transactionId,
            orderId: existingOrder.id,
            raw: statusData,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: addressData, error: addressError } = await supabase
        .from("addresses")
        .insert({
          user_id: pendingOrder.user_id,
          full_name: address.fullName || "",
          phone: address.phone || "",
          address_line_1: address.house || "",
          address_line_2: address.street || "",
          city: address.city || "",
          state: address.state || "",
          pincode: address.pinCode || "",
          landmark: address.landmark || null,
          is_default: false,
          address_type: address.addressType || "Home",
        })
        .select("id")
        .single();

      if (addressError || !addressData) {
        console.error("Address insert error:", addressError);
        throw new Error("Failed to create delivery address");
      }

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: pendingOrder.user_id,
          address_id: addressData.id,
          subtotal: Number(payload.subtotal || 0),
          discount: Number(payload.discount || 0),
          shipping: Number(payload.shipping || 0),
          total: Number(payload.total || pendingOrder.amount || 0),
          coupon_code: coupon.code || null,
          coupon_type: coupon.type || null,
          coupon_value: coupon.value || null,
          coupon_discount_amount: Number(coupon.discountAmount || 0),
          status: "confirmed",
          email: profile.email || "",
          payment_method: "phonepe",
          payment_status: "paid",
          payment_gateway: "phonepe",
          transaction_id: merchantOrderId,
          confirmed_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (orderError || !orderData) {
        console.error("Order insert error:", orderError);
        throw new Error("Failed to create confirmed order");
      }

      const orderItemsPayload = cartItems.map((item: any) => ({
        order_id: orderData.id,
        product_id:
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            String(item.id)
          )
            ? String(item.id)
            : null,
        product_name: item.name || "",
        product_price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
        size: item.size || null,
      }));

      if (orderItemsPayload.length > 0) {
        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItemsPayload);

        if (itemsError) {
          console.error("Order items insert error:", itemsError);
          throw new Error("Failed to create order items");
        }
      }

      await supabase
        .from("pending_orders")
        .update({ payment_status: "paid" })
        .eq("id", pendingOrder.id);

      return new Response(
        JSON.stringify({
          success: true,
          paymentStatus: "paid",
          orderStatus: "confirmed",
          phonepeState: normalizedState,
          transactionId,
          orderId: orderData.id,
          raw: statusData,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (
      normalizedState === "FAILED" ||
      normalizedState === "CANCELLED" ||
      normalizedState === "CANCELED" ||
      normalizedState === "EXPIRED"
    ) {
      await supabase
        .from("pending_orders")
        .update({ payment_status: "failed" })
        .eq("id", pendingOrder.id);

      return new Response(
        JSON.stringify({
          success: true,
          paymentStatus: "failed",
          orderStatus: "cancelled",
          phonepeState: normalizedState,
          transactionId,
          raw: statusData,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    await supabase
      .from("pending_orders")
      .update({ payment_status: "pending" })
      .eq("id", pendingOrder.id);

    return new Response(
      JSON.stringify({
        success: true,
        paymentStatus: "pending",
        orderStatus: "pending",
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