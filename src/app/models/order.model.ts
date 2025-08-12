export enum PaymentMethod {
    PAYMENT_INSTALLMENT = 'PAYMENT_INSTALLMENT',
    PAYMENT_CASH = 'PAYMENT_CASH'
}

export enum OrderStatus {
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

export interface OrderRequest {
    cartId: string;
    paymentMethod: PaymentMethod | string;
    installmentCount: number;
    interestRate: number;
}

export function createOrderRequest(cartId: string, paymentMethod: PaymentMethod | string, installmentCount: number, interestRate: number): OrderRequest {
    return { cartId, paymentMethod, installmentCount, interestRate };
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