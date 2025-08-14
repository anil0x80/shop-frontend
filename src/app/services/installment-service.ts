import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { InstallmentPaymentDto } from '../models/installment.model';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {
  private http = inject(HttpClient);

  getInstallmentsByOrder(orderId: string){
    return this.http.get<InstallmentPaymentDto>(`${environment.apiUrl}/api/v1/installment/order/${orderId}`);
  }

  payInstallment(installmentId: string){
    return this.http.post<InstallmentPaymentDto>(`${environment.apiUrl}/api/v1/installment/pay`, { installmentId });
  }
}
