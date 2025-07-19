import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useItems } from '@/hooks/use-items';
import { ItemCard } from '@/components/item-card';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import { StatusBadge } from './ui/status-badge';

interface ItemSearchProps {
  onStatusChange?: (id: string) => void;
}

export function ItemSearch({ onStatusChange }: ItemSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { searchBySerial } = useItems();
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    setSearchPerformed(true);
    
    try {
      const results = await searchBySerial(searchQuery.trim());
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };
  
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
        <Button type="submit" disabled={searching}>
          {searching ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          {searching ? 'Searching...' : 'Search'}
        </Button>
      </form>
      
      
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
                No items found matching your search. Try a different serial number or search term.
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