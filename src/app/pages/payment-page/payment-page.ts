import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-payment-page',
  imports: [],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css'
})
export class PaymentPage implements OnInit {
  private productService = inject(ProductService)
  products = this.productService.getProductsByCategory({id: "araba",
    categoryName: "araba",createdAt: "", updatedAt: "", taxes: [] })
  total_price = 0;


  ngOnInit(): void {
    this.calculateTotalPrice();
  }

  private calculateTotalPrice(): void {
    this.total_price = 0;
    for (let index = 0; index < this.products.length; index++) {
      const product = this.products[index];
      this.total_price += product.price || 0; // Assuming products have a price property
    }
  }
}
