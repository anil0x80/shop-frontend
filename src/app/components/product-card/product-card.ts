import { Component, input ,inject} from '@angular/core';
import { ProductResponse } from '../../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-card',
  imports: [MatIconModule,CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  private router = inject(Router)
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  user = this.authService.user();

  product = input<ProductResponse>({
    id: '1',
    productName: 'Temporary Product',
    price: 100,
    description: 'This is a temporary product for testing purposes.',
    stock: 10,
    images: [{
      id: 'Temporary Product Image',
      imageUrl: 'https://picsum.photos/200',
      createdAt: '',
      updatedAt: ''
    }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categoryId: 'default-category'
  });

  goToProductPage(){
    this.router.navigate(['/product', this.product().id]);
  }

  addProductToCart(event:MouseEvent){
    if(this.user){
      event.stopPropagation();
      const cartRequest = {
        userId: this.user.id,
        productId: this.product().id,
        quantity: 1
      };
      this.cartService.addItemToCart(cartRequest).subscribe(
        {
          next: value =>this.router.navigate(['/cart']),
          error: error => console.error('Error adding item to cart:', error)
        }
      )
    }
    else{
      this.router.navigate(['/sign-in'])
    }
  }
}
