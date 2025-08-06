export interface OrderRequest{
    cartId: string;
    paymentMethod: string;
    installmentCount: number;
    interestRate: number;
}

export function createOrderRequest(cartId: string, paymentMethod: string, installmentCount: number, interestRate: number): OrderRequest {
    return { cartId, paymentMethod, installmentCount, interestRate };
}