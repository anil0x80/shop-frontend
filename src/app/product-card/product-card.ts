import { Component, input ,inject} from '@angular/core';
import { Product } from '../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-card',
  imports: [MatIconModule,CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  private router = inject(Router)

  product = input<Product>({
    product_id: '1',
    product_name: 'Temporary Product',
    price: 100,
    description: 'This is a temporary product for testing purposes.',
    stock: 10,
    images: ['https://picsum.photos/200'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
    category_id: 'default-category'
  });

  goToProductPage(){
    this.router.navigate(['/product', this.product().product_id]);
  }

  addProductToCart(event:MouseEvent){
    event.stopPropagation();
    //TODO
    console.log("xd")
  }
}
