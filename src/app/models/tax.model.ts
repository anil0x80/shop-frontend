export interface TaxRequest {
  taxName: string;
}

export interface TaxResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  taxName: string;
}

export interface UpdateTaxRequest extends TaxRequest {
  id: string;
}
