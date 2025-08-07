// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CreateProductRequest,
  UpdateProductRequest,
  ProductResponse
} from '../models/product.model';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = `${environment.apiUrl}/api/v1/products`;

  constructor(private http: HttpClient) {}

  /**
   * Get all products
   * GET /api/v1/products
   */
  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.API_URL);
  }

  /**
   * Get a single product by ID
   * GET /api/v1/products/{id}
   */
  getProductById(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.API_URL}/${id}`);
  }

  /**
   * Create a new product
   * POST /api/v1/products
   */
  createProduct(request: CreateProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.API_URL, request);
  }

  /**
   * Update an existing product
   * PUT /api/v1/products
   */
  updateProduct(request: UpdateProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(this.API_URL, request);
  }

  /**
   * Delete a product by ID
   * DELETE /api/v1/products/{id}
   */
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

    /**
   * Get random products by category (frontend implementation)
   * Fetches all products and filters/randomizes on the frontend
   */
  getRandomProductsByCategory(categoryId: string, limit: number = 5): Observable<ProductResponse[]> {
    return this.getAllProducts().pipe(
      map(products => {
        // Filter products by category
        const categoryProducts = products.filter(product => product.categoryId === categoryId);

        // Shuffle the array using Fisher-Yates algorithm
        const shuffled = [...categoryProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Return the first 'limit' items
        return shuffled.slice(0, limit);
      })
    );
  }
}
