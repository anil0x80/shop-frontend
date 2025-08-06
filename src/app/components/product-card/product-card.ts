import { Component, input ,inject} from '@angular/core';
import { ProductResponse } from '../../models/product.model';
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
    event.stopPropagation();
    //TODO
    console.log("xd")
  }
}
