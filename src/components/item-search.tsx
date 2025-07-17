import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useItemStore } from '@/lib/store';
import { ItemCard } from '@/components/item-card';
import { Search, AlertCircle } from 'lucide-react';
import { StatusBadge } from './ui/status-badge';

interface ItemSearchProps {
  onStatusChange?: (id: string) => void;
}

export function ItemSearch({ onStatusChange }: ItemSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [exactSearch, setExactSearch] = useState(false);
  const { getItemBySerial, searchItems } = useItemStore();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
  };

  // Get search results
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    
    if (exactSearch) {
      const result = getItemBySerial(searchQuery.trim());
      return result ? [result] : [];
    }
    
    return searchItems(searchQuery);
  };
  
  const searchResults = searchPerformed ? getSearchResults() : [];
  
  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter serial number or search terms..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearchPerformed(false);
          }}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
      
      <div className="flex items-center space-x-2">
        <label className="text-sm flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={exactSearch}
            onChange={() => setExactSearch(!exactSearch)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span>Exact serial number match</span>
        </label>
      </div>
      
      {searchPerformed && (
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            <div className="space-y-4 animate-fade-in">
              <div className="py-2 px-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                {searchResults.map(item => (
                  <ItemCard 
                    key={item.id} 
                    item={item}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 px-4 border border-dashed rounded-lg flex flex-col items-center justify-center text-center space-y-2 animate-fade-in">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">No items found</h3>
              <p className="text-sm text-muted-foreground">
                {exactSearch 
                  ? "No item with this exact serial number was found in the registry." 
                  : "Try a different search term or check the serial number."
                }
              </p>
              <div className="mt-2">
                <StatusBadge status="unknown" size="lg" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}