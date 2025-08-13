export enum PaymentMethod {
    PAYMENT_INSTALLMENT = 'PAYMENT_INSTALLMENT',
    PAYMENT_CASH = 'PAYMENT_CASH'
}

export enum OrderStatus {
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

export interface InstallmentOrderRequest{
    cartId: string;
    installmentCount:InstallmentOption
}

export enum InstallmentOption {
  THREE = 3,
  SIX = 6,
  TWELVE = 12,
  TWENTY_FOUR = 24
}

export interface CashOrderRequest{
    cartId:string;
}

export interface OrderItemDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    productId: string;
    quantity: number;
    price: number;
    preTaxPrice: number;
}

export interface OrderResponse {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: OrderStatus | string;
    totalAmount: number;
    paymentMethod: PaymentMethod | string;
    orderItems: OrderItemDto[];
}
