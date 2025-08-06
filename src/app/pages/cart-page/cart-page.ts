import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, Validators,} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CartRequest,CartDto,CartItemDto } from '../../models/cart.model';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})

export class CartPage {
    private router = inject(Router);
    private cartService = inject(CartService);
    private authService = inject(AuthService);

    cart = signal<CartDto | undefined>(undefined);
    cartCopy: CartDto | undefined;

    // prevent negative numbers
    clampQuantity(event: any, item: any) {
        const value = parseInt(event.target.value);
        if (value < 1 || isNaN(value)) {
            event.target.value = 1;
            item.quantity = 1;
        }
    }

    private handleCartSuccess = (cartData: CartDto) => {
    this.cart.set(cartData);
    this.cartCopy = typeof structuredClone !== 'undefined'
        ? structuredClone(cartData)
        : JSON.parse(JSON.stringify(cartData));
    };

    private handleCartError = (err: any) => {
        console.error('Failed to update quantity:', err);
    };

    cartTotal() {
        const cart = this.cart();
        if (!cart) return 0
        
        let price = 0;

        for (const item of cart.cartItems || []) {
            price += item.product.price * item.quantity;
        }

        return price;
    }

    updateQuantity(item: CartItemDto, newQuantity: number): void {
        // need to use button to remove
        if (newQuantity < 1) return;

        const originalItem = this.cartCopy?.cartItems.find(i => i.id === item.id);
        if(!originalItem)
            return;
        
        // no changes
        if(newQuantity == originalItem.quantity)
            return;

        const userId = this.authService.user()?.id;
        if (!userId) {
            console.error('User not logged in');
            return;
        }
        
        // add
        if(newQuantity > originalItem.quantity){
            const request: CartRequest = {
                userId: userId,
                productId: item.product.id,
                quantity: newQuantity - originalItem.quantity
            };

            this.cartService.addItemToCart(request).subscribe({
                next: this.handleCartSuccess,
                error: this.handleCartError
            });
        }
        // remove
        else{
            const request: CartRequest = {
                userId: userId,
                productId: item.product.id,
                quantity: originalItem.quantity - newQuantity
            };

            this.cartService.removeItemFromCart(request).subscribe({
                next: this.handleCartSuccess,
                error: this.handleCartError
            });
        }

 
    }

    onQuantityChange(item: CartItemDto): void {
        this.updateQuantity(item, item.quantity);
    }

    loadCart(userId: string) : void {
        // const mockCart: CartDto = {
        //     id: 'mock-cart-id',
        //     createdAt: new Date().toISOString(),
        //     updatedAt: new Date().toISOString(),
        //     cartItems: [
        //         {
        //             id: 'item-1',
        //             product: {
        //                 id: 'product-1',
        //                 createdAt: new Date().toISOString(),
        //                 updatedAt: new Date().toISOString(),
        //                 productName: 'Test Product',
        //                 price: 99.99,
        //                 description: 'This is a test product',
        //                 stock: 5,
        //                 categoryId: 'cat-1',
        //                 images: [
        //                     {
        //                     id: 'image-1',
        //                     imageUrl: 'https://picsum.photos/77',
        //                     createdAt: new Date().toISOString(),
        //                     updatedAt: new Date().toISOString(),
        //                     }
        //                 ]
        //                 },
        //                 quantity: 2,
        //                 createdAt: new Date().toISOString(),
        //                 updatedAt: new Date().toISOString()
        //         },
        //         {
        //             id: 'item-2',
        //             product: {
        //                 id: 'product-2',
        //                 createdAt: new Date().toISOString(),
        //                 updatedAt: new Date().toISOString(),
        //                 productName: 'Test Product 2',
        //                 price: 39.99,
        //                 description: 'This is a test product 2',
        //                 stock: 5,
        //                 categoryId: 'cat-1',
        //                 images: [
        //                     {
        //                     id: 'image-2',
        //                     imageUrl: 'https://picsum.photos/88',
        //                     createdAt: new Date().toISOString(),
        //                     updatedAt: new Date().toISOString(),
        //                     }
        //                 ]
        //                 },
        //                 quantity: 3,
        //                 createdAt: new Date().toISOString(),
        //                 updatedAt: new Date().toISOString()
        //         }
        //     ]
        // };

        // // Use mock cart for testing
        // of(mockCart).subscribe({
        //     next: this.handleCartSuccess,
        //     error: this.handleCartError
        // });

        // Uncomment below when restoring real API call
        
        this.cartService.getActiveCart(userId).subscribe({
           next: this.handleCartSuccess,
           error: this.handleCartError
        });
        
    }

    goToPaymnet(){
        this.router.navigate(["/payment"])
    }

    goToHome(){
        this.router.navigate(["/"])
    }

    ngOnInit(): void {
        let userId = this.authService.user()?.id;
        // TODO RESTORE
        //if (!userId) {
        //    this.router.navigate(['/sign-in']);
        //    return;
        //}
        if(!userId){
            userId = "DefaultUserId";
        }

        this.loadCart(userId)
    }
}
