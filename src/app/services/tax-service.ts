import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TaxRequest, TaxResponse, UpdateTaxRequest } from '../models/tax.model';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/v1/taxes`;

  getAllTaxes(): Observable<TaxResponse[]> {
    return this.http.get<TaxResponse[]>(this.apiUrl);
  }

  createTax(taxRequest: TaxRequest): Observable<TaxResponse> {
    return this.http.post<TaxResponse>(this.apiUrl, taxRequest);
  }

  getTax(id: string): Observable<TaxResponse> {
    return this.http.get<TaxResponse>(`${this.apiUrl}/${id}`);
  }

  updateTax(updateTaxRequest: UpdateTaxRequest): Observable<TaxResponse> {
    return this.http.put<TaxResponse>(this.apiUrl, updateTaxRequest);
  }

  deleteTax(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
