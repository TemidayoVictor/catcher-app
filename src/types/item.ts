export type ItemStatus = 'safe' | 'stolen' | 'unknown';

export interface Item {
  id: string;
  name: string;
  serial_number: string;
  status: ItemStatus;
  description?: string;
  category?: string;
  created_at: string;
  updated_at: string;
  image_url?: string;
  owner?: string;
  contact_info?: string;
  user_id: string;
}