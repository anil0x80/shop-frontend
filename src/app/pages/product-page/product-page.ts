import { Component,inject, OnInit} from '@angular/core';
import { ProductService} from '../../services/product-service'; 
import { Product } from '../../models/product.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ImageSlider } from '../../components/image-slider/image-slider';
import { AddToCartButton } from "../../components/add-to-cart-button/add-to-cart-button";

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, ImageSlider, AddToCartButton],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage implements OnInit{
  private router = inject(Router)
  productId: string | null = null;
  product: Product | undefined;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.product = this.productService.getProductById(this.productId);  //This wont be like this in final version.
    } else {
      console.error('Product ID is null');
    }
  }
}
