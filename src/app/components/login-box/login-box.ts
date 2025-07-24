import { Component,inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login-box',
  imports: [ReactiveFormsModule,MatIconModule],
  templateUrl: './login-box.html',
  styleUrl: './login-box.css'
})
export class LoginBox {

  formBuilder = inject(FormBuilder)
  showPassword = false;
  inputType = "password"

  signInForm = this.formBuilder.group({
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
