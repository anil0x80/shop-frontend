import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {FormControl, ReactiveFormsModule,FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth-service';
import { CartDto } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [CurrencyPipe, ReactiveFormsModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  user = this.authService.user;
  

  searchForm = this.formBuilder.group({
    search:['',Validators.required]
  })

  cartTotalPrice = signal<number>(0);
  cartItemsCount = signal<number>(0);
  
  private cartSubscription?: Subscription;

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      if (cart) {
        this.cartTotalPrice.set(this.calculateCartTotal(cart));
        this.cartItemsCount.set(this.calculateItemCount(cart));
      } else {
        this.cartTotalPrice.set(0);
        this.cartItemsCount.set(0);
      }
    });

    // Load initial cart data
    const userId = this.authService.user()?.id;
    if (userId) {
      this.cartService.getActiveCart(userId).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  private calculateCartTotal(cart: CartDto): number {
    if (!cart.cartItems) return 0;
    return cart.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  private calculateItemCount(cart: CartDto): number {
    if (!cart.cartItems) return 0;
    return cart.cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  reDirect(route:string){
    this.router.navigate([route])
  }

  search(){
    if(this.searchForm.valid){
      this.router.navigate(['/search'],{
        queryParams:{
          search:this.searchForm.get('search')?.value
        }
      })
    }
  }
}
