import React from 'react';
import { ItemForm } from '@/components/item-form';
import { useItems } from '@/hooks/use-items';
import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const { addItem } = useItems();
  const { user } = useAuth();
  
  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  const handleSubmit = async (data: any) => {
    try {
      await addItem(data);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Register an Item</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Add an item to the registry by filling out the form below.
        </p>
        
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <ItemForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Register;