import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ReactiveFormsModule ,FormBuilder} from '@angular/forms';
import { OrderService } from '../../services/order-service';
import { OrderRequest,createOrderRequest } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-payment-page',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css'
})
export class PaymentPage implements OnInit {
  private productService = inject(ProductService)
  private formBuilder = inject(FormBuilder);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  cartId:string = "def89491-a1da-43b0-a4b7-a7cf5388d9b0";

  products = this.productService.getProductsByCategory({id: "araba",
    categoryName: "araba",createdAt: "", updatedAt: "", taxes: [] })
  total_price = 0;
  
  paymentForm = this.formBuilder.group({
    paymentMethod: ['credit'],
    installmentCount: [null],
  })


  ngOnInit(): void {
    const user = this.authService.user()
    this.calculateTotalPrice();
    if(user){
      this.cartService.getActiveCart(user.id).subscribe(
        {
          next: response =>
          this.cartId = response.id
        }
      );
    }
  }

  private calculateTotalPrice(): void {
    this.total_price = 0;
    for (let index = 0; index < this.products.length; index++) {
      const product = this.products[index];
      this.total_price += product.price || 0; 
    }
  }

  onSubmit(): void {
    
    const paymentMethod = this.paymentForm.get('paymentMethod')?.value;
    
    if (paymentMethod === "credit") {
      const installmentCountValue = this.paymentForm.get('installmentCount')?.value;
      const installmentCount = Number(installmentCountValue) || 0;
      
      if (!installmentCountValue || installmentCount === 0) {
        console.error('Installment count is required for credit payments');
        return;
      }
      
      // Map frontend values to backend enum values
      const backendPaymentMethod = "PAYMENT_INSTALLMENT";
      console.log('Creating order request:', { cartId: this.cartId, paymentMethod: backendPaymentMethod, installmentCount, interestRate: 0.0425 });
      
      this.orderService.placeOrder(
        createOrderRequest(this.cartId, backendPaymentMethod, installmentCount, 0.0425)
      ).subscribe();
    }
    else if(paymentMethod === "cash"){
      // Map frontend values to backend enum values
      const backendPaymentMethod = "PAYMENT_CASH";
      console.log('Creating cash order request:', { cartId: this.cartId, paymentMethod: backendPaymentMethod, installmentCount: 0, interestRate: 0 });
      
      this.orderService.placeOrder(
        createOrderRequest(this.cartId, backendPaymentMethod, 0, 0)
      ).subscribe();
    }
  }
}
