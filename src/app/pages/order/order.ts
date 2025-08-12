import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItemDto, OrderResponse } from '../../models/order.model';
import { OrderService } from '../../services/order-service';
import { ProductResponse } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class OrderPage implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private router = inject(Router);

  order?: OrderResponse;
  items: OrderItemDto[] = [];
  itemProducts: Record<string, ProductResponse | undefined> = {};
  loading = false;
  error?: string;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Order ID is missing';
      return;
    }
    this.fetchOrder(id);
  }

  private fetchOrder(id: string){
    this.loading = true;
    this.orderService.getOrder(id).subscribe({
      next: data => {
        this.order = data;
        this.items = data.orderItems || [];
        this.loadProductsForItems();
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load order';
        this.loading = false;
        console.error('getOrder error', err);
        this.router.navigate(['/']);
      }
    });
  }

  private loadProductsForItems(){
  if (!this.items.length) return;
  forkJoin(this.items.map((i: OrderItemDto) => this.productService.getProductById(i.productId))).subscribe({
      next: products => {
        for (const p of products) {
          this.itemProducts[p.id] = p;
        }
      },
      error: err => console.error('loadProductsForItems error', err)
    });
  }

  trackItem(index: number, item: OrderItemDto){
    return item.id;
  }
}
