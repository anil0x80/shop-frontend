import { inject, Injectable } from '@angular/core';
import { OrderRequest } from '../models/order.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient)
  

  placeOrder(orderRequst:OrderRequest){
    return this.http.post(environment.apiUrl + "/api/v1/order/place",orderRequst)
  }
}
