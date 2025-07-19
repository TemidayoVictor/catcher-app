import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyPaymentRequest {
  reference: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role for inserting items
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { reference }: VerifyPaymentRequest = await req.json();
    
    // Verify payment with Paystack
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("PAYSTACK_LIVE_SECRET_KEY")}`,
        "Content-Type": "application/json",
      },
    });

    const verificationData = await verifyResponse.json();
    console.log("Paystack verification response:", verificationData);

    if (!verificationData.status || verificationData.data.status !== "success") {
      throw new Error("Payment verification failed");
    }

    // Extract item data from metadata
    const metadata = verificationData.data.metadata;
    const itemData = JSON.parse(metadata.item_data);
    
    // Add the item to the database
    const { data: insertedItem, error: insertError } = await supabaseService
      .from("items")
      .insert({
        ...itemData,
        user_id: metadata.user_id,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting item:", insertError);
      throw new Error("Failed to register item after payment");
    }

    console.log("Item successfully registered:", insertedItem);

    return new Response(JSON.stringify({ 
      success: true,
      item: insertedItem,
      payment_reference: reference 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});