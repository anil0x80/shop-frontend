import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormControl, ReactiveFormsModule,FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-header',
  imports: [CurrencyPipe, ReactiveFormsModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  user = this.authService.user;

  searchForm = this.formBuilder.group({
    search:['']
  })

  cartTotalPrice:number = 59;
  cartItemsCount:number = 2;

  onSubmit(){
    console.log(this.searchForm.value.search)
  }
  reDirect(route:string){
    this.router.navigate([route])
  }
}
