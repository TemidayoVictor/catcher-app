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
          placeholder="Enter exact serial number..."
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
              <div className="py-3 px-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                {searchResults.map(item => (
                  <div key={item.id} className="border rounded-lg p-4 bg-card">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <StatusBadge status={item.status} size="lg" />
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Serial Number:</strong> {item.serial_number}</p>
                      {item.category && <p><strong>Category:</strong> {item.category}</p>}
                      {item.description && <p><strong>Description:</strong> {item.description}</p>}
                      {item.owner && <p><strong>Owner:</strong> {item.owner}</p>}
                      {item.contact_info && <p><strong>Contact:</strong> {item.contact_info}</p>}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Last updated: {new Date(item.updated_at).toLocaleDateString()}
                        </span>
                        {item.status === 'safe' && onStatusChange && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => onStatusChange(item.id)}
                          >
                            Mark as Stolen
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
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