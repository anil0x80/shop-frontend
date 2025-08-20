// models/product.model.ts
import { ProductImageResponse } from '../models/product-image.model';

export interface CreateProductPayload {
  productName: string;
  price: number;
  categoryId: string;
  description: string;
  stock: number;
}

export interface UpdateProductPayload {
  id: string;
  productName?: string;
  price?: number;
  categoryId?: string;
  description?: string;
  stock?: number;
}

export interface ProductResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  productName: string;
  price: number;
  afterTaxPrice: number;
  description: string;
  stock: number;
  categoryId: string;
  images: ProductImageResponse[];
}
