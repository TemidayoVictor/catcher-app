import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredItem, setRegisteredItem] = useState<any>(null);

  const reference = searchParams.get('reference');

  useEffect(() => {
    if (!reference) {
      setVerificationStatus('error');
      setErrorMessage('Payment reference not found');
      return;
    }

    verifyPayment();
  }, [reference]);

  const verifyPayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { reference },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.success) {
        setVerificationStatus('success');
        setRegisteredItem(data.item);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      setVerificationStatus('error');
      setErrorMessage(error.message || 'Failed to verify payment');
    }
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            {verificationStatus === 'loading' && (
              <>
                <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-primary" />
                <CardTitle>Verifying Payment...</CardTitle>
                <CardDescription>
                  Please wait while we verify your payment and register your item.
                </CardDescription>
              </>
            )}
            
            {verificationStatus === 'success' && (
              <>
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <CardTitle className="text-green-700">Payment Successful!</CardTitle>
                <CardDescription>
                  Your item has been successfully registered in the Catcher registry.
                </CardDescription>
              </>
            )}
            
            {verificationStatus === 'error' && (
              <>
                <XCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
                <CardTitle className="text-red-700">Payment Failed</CardTitle>
                <CardDescription>
                  {errorMessage || 'There was an issue processing your payment.'}
                </CardDescription>
              </>
            )}
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            {verificationStatus === 'success' && registeredItem && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-green-800 mb-2">Item Registered:</h3>
                <p><strong>Name:</strong> {registeredItem.name}</p>
                <p><strong>Serial Number:</strong> {registeredItem.serial_number}</p>
                <p><strong>Category:</strong> {registeredItem.category}</p>
                <p><strong>Status:</strong> {registeredItem.status}</p>
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              {verificationStatus === 'success' ? (
                <>
                  <Button asChild>
                    <Link to="/my-items">View My Items</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/register">Register Another Item</Link>
                  </Button>
                </>
              ) : verificationStatus === 'error' ? (
                <>
                  <Button asChild>
                    <Link to="/register">Try Again</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/">Go Home</Link>
                  </Button>
                </>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;