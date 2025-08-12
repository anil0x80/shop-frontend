import { ProductImageRequest, ProductImageResponse } from '../models/product-image.model';

export interface CreateProductRequest {
  productName: string;
  price: number;
  categoryId: string;
  description: string;
  stock: number;
  imageUrls: ProductImageRequest[];
}

export interface UpdateProductRequest {
  id: string;
  productName?: string;
  price?: number;
  categoryId?: string;
  description?: string;
  stock?: number;
  imageUrls?: ProductImageRequest[];
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
