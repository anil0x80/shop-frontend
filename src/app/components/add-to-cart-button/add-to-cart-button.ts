import { Component, signal } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-add-to-cart-button',
  imports: [MatIconModule],
  templateUrl: './add-to-cart-button.html',
  styleUrl: './add-to-cart-button.css'
})
export class AddToCartButton {
  amount = signal(0);

  increase(){
    this.amount.set(this.amount() + 1)
  }
  decrease(){
    if(this.amount()>0){
       this.amount.set(this.amount() - 1)
    }
  }
}
