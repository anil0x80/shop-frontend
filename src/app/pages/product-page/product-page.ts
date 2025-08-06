import { Component,inject, OnInit} from '@angular/core';
import { ProductService} from '../../services/product-service'; 
import { ProductResponse } from '../../models/product.model';
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
  product: ProductResponse | undefined;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  images: string[] = []

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) return console.error('Product ID is null');

      this.productService.getProductById(id)
        .subscribe({
          next: productData => {
            this.product = productData

            for (const item of this.product.images || []) {
              this.images.push(item.imageUrl);
            }
          },
          error: err => console.error('error getProductById', err)
        });
  }
}
