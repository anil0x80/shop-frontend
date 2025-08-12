import { Component,inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-box',
  imports: [ReactiveFormsModule,MatIconModule],
  templateUrl: './login-box.html',
  styleUrl: './login-box.css'
})
export class LoginBox {
  private authService = inject(AuthService);
  private router = inject(Router);

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

onSignIn(){
  if (this.signInForm.valid) {
      const username = this.signInForm.value.username;
      const password = this.signInForm.value.password;
      
      if (username && password) {
        this.authService.login(username, password).subscribe({
          next: response=>{
          
          this.authService.setUser(response);
          this.router.navigate(["/"]);
          },
          error: (err) => {
            const message = err.error?.errors?.[0]?.defaultMessage || "Unknown error occurred";
            alert("Sign in failed:" + message);
          }
        }
        );
      }
      } else {
      alert("Please fill in all required fields correctly.");
    }
  }
}

