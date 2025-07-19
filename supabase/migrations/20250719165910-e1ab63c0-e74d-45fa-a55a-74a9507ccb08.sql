-- Create enum for item status
CREATE TYPE public.item_status AS ENUM ('safe', 'stolen', 'unknown');

-- Create items table
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  serial_number TEXT NOT NULL,
  status public.item_status NOT NULL DEFAULT 'safe',
  description TEXT,
  category TEXT,
  image_url TEXT,
  owner TEXT,
  contact_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Create unique constraint on serial number for user
  UNIQUE(user_id, serial_number)
);

-- Create index for better search performance
CREATE INDEX idx_items_serial_number ON public.items(serial_number);
CREATE INDEX idx_items_name ON public.items(name);
CREATE INDEX idx_items_category ON public.items(category);
CREATE INDEX idx_items_status ON public.items(status);

-- Enable Row Level Security
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create policies for item access
CREATE POLICY "Users can view their own items" 
ON public.items 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own items" 
ON public.items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own items" 
ON public.items 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own items" 
ON public.items 
FOR DELETE 
USING (auth.uid() = user_id);

-- Allow public search for stolen items only
CREATE POLICY "Anyone can search stolen items" 
ON public.items 
FOR SELECT 
USING (status = 'stolen');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_items_updated_at
BEFORE UPDATE ON public.items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();