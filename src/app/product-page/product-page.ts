import { Component,inject, OnInit} from '@angular/core';
import { ProductService} from '../services/product-service'; 
import { Product } from '../models/product.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
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
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.product = this.productService.getProductById(this.productId); 
    } else {
      console.error('Product ID is null');
    }
  }
}
