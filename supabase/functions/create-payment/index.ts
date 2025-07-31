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
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      "https://dfsvmucqlfoszsfyjxbn.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmc3ZtdWNxbGZvc3pzZnlqeGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjQwMDEsImV4cCI6MjA2MTUwMDAwMX0.Qea6jAF7SFOWcd941nIGBjO1bifbGRBaihol5-A3h8I"
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
    
    // Invoke Paystack transaction initialization function
    const { data: paymentData, error: paymentError } = await supabaseClient.functions.invoke('create-payment', {
      body: {
        email: email,
        amount: 500000, // ₦5,000 in kobo (Paystack uses kobo)
      },
    });

    if (paymentError) {
      throw new Error(paymentError.message || "Failed to initialize payment");
    }

    return new Response(JSON.stringify({ 
      authorization_url: paymentData.authorization_url,
      reference: paymentData.reference 
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