import React from 'react';
import { ItemCard } from '@/components/item-card';
import { useItemStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyItems = () => {
  const { items, updateItemStatus } = useItemStore();
  const { toast } = useToast();
  
  const handleStatusToggle = (id: string) => {
    const item = items.find(item => item.id === id);
    if (!item) return;
    
    const newStatus = item.status === 'stolen' ? 'safe' : 'stolen';
    updateItemStatus(id, newStatus);
    
    toast({
      title: "Status Updated",
      description: `Item marked as ${newStatus === 'stolen' ? 'stolen' : 'safe'}.`,
      variant: newStatus === 'stolen' ? "destructive" : "default",
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Items</h1>
            <p className="text-muted-foreground">
              Manage your registered items and update their status.
            </p>
          </div>
          <Link to="/register">
            <Button>
              <CirclePlus className="mr-2 h-4 w-4" />
              Register New
            </Button>
          </Link>
        </div>
        
        {items.length > 0 ? (
          <div className="grid gap-4">
            {items.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onStatusChange={() => handleStatusToggle(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <h2 className="text-xl font-medium mb-2">No items registered</h2>
            <p className="text-muted-foreground mb-6">
              You haven't registered any items yet. Register your first item to start protecting it.
            </p>
            <Link to="/register">
              <Button>
                <CirclePlus className="mr-2 h-4 w-4" />
                Register Your First Item
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItems;