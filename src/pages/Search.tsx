import React from 'react';
import { ItemSearch } from '@/components/item-search';
import { useItemStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const Search = () => {
  const { updateItemStatus } = useItemStore();
  const { toast } = useToast();
  
  const handleStatusChange = (id: string) => {
    updateItemStatus(id, 'stolen');
    toast({
      title: "Status Updated",
      description: "The item has been marked as stolen.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Search Registry</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Search for items by serial number to verify if they've been reported stolen.
        </p>
        
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <ItemSearch onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default Search;