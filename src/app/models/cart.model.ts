export interface ProductImageResponse {
  id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  productName: string;
  price: number;
  description: string;
  stock: number;
  categoryId: string;
  images: ProductImageResponse[];
}

export interface CartItemDto {
  id: string;
  product: ProductResponse;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  cartItems: CartItemDto[];
}

export interface CartRequest {
  userId: string;
  productId: string;
  quantity: number;
}