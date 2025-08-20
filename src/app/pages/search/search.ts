import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { ProductResponse } from '../../models/product.model';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-search',
  imports: [ProductCard],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  search:string = '';
  products: ProductResponse[] | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.search = params['search'];
      this.fetchProducts();
    });
  }

  private fetchProducts(){
    this.loading = true;
    this.error = null;
    this.products = null;
    this.productService.searchProducts(this.search).subscribe({
      next: res => { this.products = res; this.loading = false; },
      error: err => { console.error(err); this.error = 'Failed to load products'; this.loading = false; }
    })
  }

}
