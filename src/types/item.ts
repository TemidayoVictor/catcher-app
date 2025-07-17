export type ItemStatus = 'safe' | 'stolen' | 'unknown';

export interface Item {
  id: string;
  name: string;
  serialNumber: string;
  status: ItemStatus;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  owner?: string;
  contactInfo?: string;
}