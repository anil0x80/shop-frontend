import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormControl, ReactiveFormsModule,FormGroup,FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [CurrencyPipe,ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isSigned = true;
  formBuilder = inject(FormBuilder)
  username = "Anıl";

  searchForm = this.formBuilder.group({
    search:['']
  })

  cartTotalPrice:number = 59;
  cartItemsCount:number = 2;

  onSubmit(){
    console.log(this.searchForm.value.search)
  }
}
