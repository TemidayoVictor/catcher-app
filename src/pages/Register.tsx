import React from 'react';
import { ItemForm } from '@/components/item-form';
import { useItemStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const { addItem } = useItemStore();
  const { toast } = useToast();
  
  const handleSubmit = (data: any) => {
    addItem(data);
    toast({
      title: "Item Registered",
      description: `${data.name} has been added to the registry.`,
    });
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