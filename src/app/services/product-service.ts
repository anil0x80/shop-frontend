// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ProductResponse, CreateProductPayload, UpdateProductPayload
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
   * Search products by keyword
   * GET /api/v1/products/search/{keyword}
   */
  searchProducts(keyword: string): Observable<ProductResponse[]> {
    if(!keyword) return this.getAllProducts();
    return this.http.get<ProductResponse[]>(`${this.API_URL}/search/${encodeURIComponent(keyword)}`);
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
  createProduct(payload: CreateProductPayload, files: File[] = []): Observable<ProductResponse> {
    const form = new FormData();
    form.append('product', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    for (const f of files) form.append('images', f); // matches @RequestPart("images")
    return this.http.post<ProductResponse>(this.API_URL, form);
  }

  /**
   * Update an existing product
   * PUT /api/v1/products
   */
  updateProduct(
    payload: UpdateProductPayload,
    newFiles: File[] = [],
    removeImageIds: string[] = []
  ): Observable<ProductResponse> {
    const form = new FormData();
    form.append('product', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    for (const f of newFiles) form.append('newImages', f); // matches @RequestPart("newImages")
    for (const id of removeImageIds) form.append('removeImageIds', id); // matches @RequestParam
    return this.http.put<ProductResponse>(this.API_URL, form);
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
