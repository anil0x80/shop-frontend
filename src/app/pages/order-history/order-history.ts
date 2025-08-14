import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { OrderResponse } from '../../models/order.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [DatePipe],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistory implements OnInit{
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  orders: OrderResponse[]|undefined;

  ngOnInit(): void {
      const user = this.authService.user();
      if(user){
        this.orderService.getOrdersOfUser(user.id).subscribe({
          next: res =>{ this.orders = res.reverse();
            console.log(res)
          },
          error: err=>{console.log(err)}
        })
      }
  }

  goToOrderDetails(id:string){
    this.router.navigate(['/order',id])
  }
}
