import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ReactiveFormsModule ,FormBuilder} from '@angular/forms';
import { OrderService } from '../../services/order-service';
import { CashOrderRequest, InstallmentOrderRequest, InstallmentOption, PaymentMethod } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth-service';
import { CartDto } from '../../models/cart.model';
import { ProductResponse } from '../../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css'
})
export class PaymentPage implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  cart: CartDto | undefined;

  products: ProductResponse[] = [];
  total_price = 0;

  paymentForm = this.formBuilder.group({
    paymentMethod: ['credit'],
    installmentCount: [null],
  })


   ngOnInit(): void {
    const user = this.authService.user();
    if (!user) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.cartService.getActiveCart(user.id).subscribe({
      next: response => {
        if (!response || !response.cartItems || response.cartItems.length === 0) {
          this.router.navigate(['/cart']);
          return;
        }

        this.cart = response;
        this.products = this.cart.cartItems.map(cartItem => cartItem.product);
        this.calculateTotalPrice();
      },
      error: () => {
        this.router.navigate(['/cart']);
      }
    });
  }

  private calculateTotalPrice(): void {
    this.total_price = 0;
    if(!this.cart)
      return;

    for (let index = 0; index < this.cart.cartItems.length; index++) {
      const cartItem = this.cart.cartItems[index];
      this.total_price += (cartItem.product.price || 0) * cartItem.quantity;
    }
  }

  onSubmit(): void {

    if(!this.cart)
      return;

  const paymentMethod = this.paymentForm.get('paymentMethod')?.value;

  if (paymentMethod === 'credit') {
      const installmentCountValue = this.paymentForm.get('installmentCount')?.value;
      const installmentCount = Number(installmentCountValue) as InstallmentOption;
      if (!installmentCountValue || ![3,6,12,24].includes(installmentCount)) return;

      const request: InstallmentOrderRequest = {
        cartId: this.cart.id,
        installmentCount
      };
      this.orderService.placeInstallmentOrder(request).subscribe({
        next: response => this.afterOrderSuccess(response.id)
      });
    } else if (paymentMethod === 'cash') {
      const request: CashOrderRequest = { cartId: this.cart.id };
      this.orderService.placeCashOrder(request).subscribe({
        next: response => this.afterOrderSuccess(response.id)
      });
    }
  }

  private afterOrderSuccess(orderId: string){
    const userId = this.authService.user()?.id;
    if (userId) {
      this.cartService.getActiveCart(userId).subscribe();
    } else {
      this.cartService.clearCartState();
    }
    this.router.navigate(["/order", orderId]);
  }
}
