import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  email: string;
  itemData: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { email, itemData }: PaymentRequest = await req.json();
    
    // Create payment with Paystack
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("PAYSTACK_LIVE_SECRET_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        amount: 500000, // ₦5,000 in kobo (Paystack uses kobo)
        currency: "NGN",
        reference: `item_${user.id}_${Date.now()}`,
        callback_url: `${req.headers.get("origin")}/payment-success`,
        metadata: {
          user_id: user.id,
          item_data: JSON.stringify(itemData),
        },
      }),
    });

    const paymentData = await paystackResponse.json();
    console.log("Paystack response:", paymentData);

    if (!paymentData.status) {
      throw new Error(paymentData.message || "Failed to initialize payment");
    }

    return new Response(JSON.stringify({ 
      authorization_url: paymentData.data.authorization_url,
      reference: paymentData.data.reference 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});