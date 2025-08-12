import { inject, Injectable } from '@angular/core';
import { OrderRequest, OrderResponse } from '../models/order.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient)
  

  placeOrder(orderRequest: OrderRequest){
    return this.http.post<OrderResponse>(environment.apiUrl + "/api/v1/order/place", orderRequest)
  }

  getOrder(orderId: string){
    return this.http.get<OrderResponse>(`${environment.apiUrl}/api/v1/order/${orderId}`);
  }

  getOrdersOfUser(userId: string){
    return this.http.get<OrderResponse[]>(`${environment.apiUrl}/api/v1/order/user/${userId}`);
  }
}
