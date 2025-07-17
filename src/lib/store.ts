import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Item, ItemStatus } from '@/types/item';

interface ItemStore {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, updates: Partial<Omit<Item, 'id' | 'createdAt'>>) => void;
  deleteItem: (id: string) => void;
  getItemBySerial: (serialNumber: string) => Item | undefined;
  searchItems: (query: string) => Item[];
  updateItemStatus: (id: string, status: ItemStatus) => void;
}

export const useItemStore = create<ItemStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (itemData) => {
        const newItem: Item = {
          ...itemData,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          items: [...state.items, newItem]
        }));
        
        return newItem;
      },
      
      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) => 
            item.id === id 
              ? { ...item, ...updates, updatedAt: new Date() } 
              : item
          )
        }));
      },
      
      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },
      
      getItemBySerial: (serialNumber) => {
        const { items } = get();
        return items.find(
          (item) => item.serialNumber.toLowerCase() === serialNumber.toLowerCase()
        );
      },
      
      searchItems: (query) => {
        const { items } = get();
        const lowercaseQuery = query.toLowerCase();
        
        return items.filter((item) => 
          item.name.toLowerCase().includes(lowercaseQuery) ||
          item.serialNumber.toLowerCase().includes(lowercaseQuery) ||
          item.description?.toLowerCase().includes(lowercaseQuery) ||
          item.category?.toLowerCase().includes(lowercaseQuery)
        );
      },
      
      updateItemStatus: (id, status) => {
        set((state) => ({
          items: state.items.map((item) => 
            item.id === id 
              ? { ...item, status, updatedAt: new Date() } 
              : item
          )
        }));
      },
    }),
    {
      name: 'item-registry-storage',
    }
  )
);