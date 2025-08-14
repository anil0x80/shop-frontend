export enum InstallmentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
}

export interface InstallmentDto {
  id: string;
  createdAt: string;      
  updatedAt: string;      
  amount: number;         
  dueDate: string;        
  paidAt: string | null;  
  lateFee: number;        
  status: InstallmentStatus | string; 
}

export interface InstallmentPaymentDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  installments: InstallmentDto[];
  interestRate: number;
}

export interface PayInstallmentRequest {
  installmentId: string;
}
