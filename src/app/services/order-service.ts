import { inject, Injectable } from '@angular/core';
import { OrderResponse, CashOrderRequest, InstallmentOrderRequest } from '../models/order.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient)
  

  placeCashOrder(request: CashOrderRequest){
    return this.http.post<OrderResponse>(`${environment.apiUrl}/api/v1/order/cash`, request);
  }

  placeInstallmentOrder(request: InstallmentOrderRequest){
    return this.http.post<OrderResponse>(`${environment.apiUrl}/api/v1/order/installment`, request);
  }

  getOrder(orderId: string){
    return this.http.get<OrderResponse>(`${environment.apiUrl}/api/v1/order/${orderId}`);
  }

  getOrdersOfUser(userId: string){
    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/api/v1/order/user/${userId}`);
  }
}
