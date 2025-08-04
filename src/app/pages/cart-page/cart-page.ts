import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, Validators,} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CartRequest,CartDto } from '../../models/cart.model';

@Component({
  selector: 'app-profile-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})

export class CartPage {
    private router = inject(Router);
    private cartService = inject(CartService);
    private authService = inject(AuthService);

    cart: CartDto | undefined;

    ngOnInit(): void {
        const userId = this.authService.user()?.id;
        if (!userId) {
            this.router.navigate(['/sign-in']);
            return;
        }

        this.cartService.getActiveCart(userId).subscribe({
            next: (cartData) => {
            this.cart = cartData;
            },
            error: (err) => {
            console.error('Failed to fetch cart:', err);
            }
        });
    }
}
