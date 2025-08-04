import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CartRequest,CartDto } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/cart`;
  
  // BehaviorSubject to keep track of current cart state
  private cartSubject = new BehaviorSubject<CartDto | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get the active cart for a user
   */
  getActiveCart(userId: string): Observable<CartDto> {
    return this.http.get<CartDto>(`${this.baseUrl}/active/${userId}`)
      .pipe(
        tap(cart => this.cartSubject.next(cart)),
        catchError(this.handleError<CartDto>('getActiveCart'))
      );
  }

  /**
   * Add an item to the cart
   */
  addItemToCart(cartRequest: CartRequest): Observable<CartDto> {
    return this.http.post<CartDto>(`${this.baseUrl}/add-item`, cartRequest)
      .pipe(
        tap(cart => this.cartSubject.next(cart)),
        catchError(this.handleError<CartDto>('addItemToCart'))
      );
  }

  /**
   * Remove a specific item from the cart
   */
  removeItemFromCart(cartRequest: CartRequest): Observable<CartDto> {
    const options = {
      body: cartRequest
    };
    
    return this.http.delete<CartDto>(`${this.baseUrl}/remove-item`, options)
      .pipe(
        tap(cart => this.cartSubject.next(cart)),
        catchError(this.handleError<CartDto>('removeItemFromCart'))
      );
  }

  /**
   * Remove all items from a cart
   */
  removeAllItemsFromCart(cartId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-all/${cartId}`)
      .pipe(
        tap(() => {
          const currentCart = this.cartSubject.value;
          if (currentCart && currentCart.id === cartId) {
            this.cartSubject.next({ ...currentCart, cartItems: [] });
          }
        }),
        catchError(this.handleError<void>('removeAllItemsFromCart'))
      );
  }

  /**
   * Get current cart value
   */
  getCurrentCart(): CartDto | null {
    return this.cartSubject.value;
  }

  /**
   * Calculate total price of cart
   */
  calculateCartTotal(): number {
    const cart = this.getCurrentCart();
    if (!cart || !cart.cartItems) {
      return 0;
    }

    return cart.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  /**
   * Get total number of items in cart
   */
  getTotalItemCount(): number {
    const cart = this.getCurrentCart();
    if (!cart || !cart.cartItems) {
      return 0;
    }

    return cart.cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  /**
   * Check if a product is in the cart
   */
  isProductInCart(productId: string): boolean {
    const cart = this.getCurrentCart();
    if (!cart || !cart.cartItems) {
      return false;
    }

    return cart.cartItems.some(item => item.product.id === productId);
  }

  /**
   * Get quantity of a specific product in cart
   */
  getProductQuantityInCart(productId: string): number {
    const cart = this.getCurrentCart();
    if (!cart || !cart.cartItems) {
      return 0;
    }

    const cartItem = cart.cartItems.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  /**
   * Clear cart state (useful for logout)
   */
  clearCartState(): void {
    this.cartSubject.next(null);
  }

  /**
   * Generic error handler
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      
      // You might want to send the error to a logging service here
      // this.notificationService.showError(`Failed to ${operation}`);
      
      // Let the app keep running by returning an empty result
      throw error;
    };
  }
}