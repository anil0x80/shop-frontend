export interface Product {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  stock: number;
  images: string[]; // Array of image URLs
  created_at: string;
  updated_at: string;
  version: number;
  category_id: string;
}

