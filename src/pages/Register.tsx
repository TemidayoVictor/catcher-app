import React, { useState } from 'react';
import { ItemForm } from '@/components/item-form';
import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Register = () => {
  const { user } = useAuth();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  const handleSubmit = async (data: any) => {
    try {
      setIsProcessingPayment(true);
      
      // Create payment with Paystack
      const { data: paymentData, error } = await supabase.functions.invoke('create-payment', {
        method: 'POST',
        body: {
          email: user.email,
          itemData: data,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Redirect to Paystack payment page
      window.location.href = paymentData.authorization_url;
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('Failed to process payment: ' + error.message);
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Register an Item</h1>
        <p className="text-muted-foreground mb-4 text-center">
          Add an item to the registry by filling out the form below.
        </p>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-center font-medium text-primary">
            Registration Fee: ₦5,000
          </p>
          <p className="text-center text-sm text-muted-foreground mt-1">
            You will be redirected to Paystack to complete payment before your item is registered.
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <ItemForm onSubmit={handleSubmit} isLoading={isProcessingPayment} />
        </div>
      </div>
    </div>
  );
};

export default Register;