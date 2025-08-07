import { Component, signal, input, output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-add-to-cart-button',
  imports: [MatIconModule],
  templateUrl: './add-to-cart-button.html',
  styleUrl: './add-to-cart-button.css'
})
export class AddToCartButton {
  // Input for stock limit
  stock = input<number>(0);
  
  amount = signal(1); // Start with 1 instead of 0
  
  // Output event emitter for add to cart
  addToCartClicked = output<number>();

  increase(){
    // Check stock limit before increasing
    if(this.amount() < this.stock()){
      this.amount.set(this.amount() + 1);
    }
  }
  
  decrease(){
    if(this.amount() > 1){
       this.amount.set(this.amount() - 1);
    }
  }
  
  onAddToCart(){
    if(this.amount() > 0 && this.amount() <= this.stock()){
      this.addToCartClicked.emit(this.amount());
    }
  }
}
