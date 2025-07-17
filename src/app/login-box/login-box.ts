import { Component,inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-box',
  imports: [ReactiveFormsModule],
  templateUrl: './login-box.html',
  styleUrl: './login-box.css'
})
export class LoginBox {

  formBuilder = inject(FormBuilder)
  showPassword = false;
  inputType = "password"

  loginForm = this.formBuilder.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })

togglePassword(){
  if (this.showPassword) {
    this.showPassword = false;
    this.inputType = "password"
  } else {
    this.showPassword = true;
    this.inputType = "text";
  }
}
}
