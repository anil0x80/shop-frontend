import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { OrderResponse } from '../../models/order.model';
import { DatePipe, CurrencyPipe, NgClass, DecimalPipe } from '@angular/common';
import { InstallmentService } from '../../services/installment-service';
import { InstallmentPaymentDto, InstallmentDto } from '../../models/installment.model';

@Component({
  selector: 'app-order-history',
  imports: [DatePipe, CurrencyPipe, DecimalPipe, NgClass],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistory implements OnInit{
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private installmentService = inject(InstallmentService);
  
  orders: OrderResponse[]|undefined;
  expanded: Set<string> = new Set();
  installmentData: Record<string, InstallmentPaymentDto | null> = {};
  loadingInstallments: Record<string, boolean> = {};
  paying: Set<string> = new Set();

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

  isInstallment(order: OrderResponse){
    return order.paymentMethod === 'PAYMENT_INSTALLMENT';
  }

  isExpanded(id: string){
    return this.expanded.has(id);
  }

  toggleInstallments(order: OrderResponse){
    const id = order.id;
    if(!this.isInstallment(order)) return;
    if(this.expanded.has(id)){
      this.expanded.delete(id);
      return;
    }
    this.expanded.add(id);
    if(!this.installmentData[id]){
      this.loadingInstallments[id] = true;
      this.installmentService.getInstallmentsByOrder(id).subscribe({
        next: res => { this.installmentData[id] = this.withSortedInstallments(res); },
        error: err => { console.error(err); this.installmentData[id] = null; },
        complete: () => { this.loadingInstallments[id] = false; }
      })
    }
  }

  private withSortedInstallments(dto: InstallmentPaymentDto): InstallmentPaymentDto {
    if(!dto?.installments) return dto;
    const sorted = [...dto.installments].sort((a,b)=>{
      const da = new Date(a.dueDate).getTime();
      const db = new Date(b.dueDate).getTime();
      if(da !== db) return da - db;
      const ca = new Date(a.createdAt).getTime();
      const cb = new Date(b.createdAt).getTime();
      if(ca !== cb) return ca - cb;
      return a.id.localeCompare(b.id);
    });
    return { ...dto, installments: sorted };
  }

  canPay(inst: InstallmentDto){
    if(!inst) return false;
    if(inst.status !== 'UNPAID') return false;
    if(inst.paidAt) return false;
  return true; 
  }

  payInstallment(inst: InstallmentDto, orderId: string){
    if(!this.canPay(inst)) return;
    this.router.navigate(['/installment/pay', inst.id]);
  }
}
