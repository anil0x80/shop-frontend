import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, MinLengthValidator} from '@angular/forms';
import {ReactiveFormsModule, Validators,} from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

enum PasswordError {
  Strength = 'passwordStrength',
  Mismatch = 'passwordMismatch',
}

enum UsernameError {
  InvalidCharacters = 'invalidCharacters',
}

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})

export class RegisterPage {
  private router = inject(Router);
  private authService = inject(AuthService);
    registerForm = new FormGroup({
    username: new FormControl('', [Validators.required,
         this.usernameValidator]),
    password: new FormControl('', 
        [Validators.required,
           this.passwordStrengthValidator]),
    repeated_password: new FormControl('', 
        [Validators.required]),
  }, { validators: this.passwordMatchValidator });

  // validator for password match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.value.password;
    const repeatedPassword = group.value.repeated_password;
    
    if (password !== repeatedPassword) {
        return { [PasswordError.Mismatch]: true };
    }
    return null;
  }

    usernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    // Allow only alphanumeric characters, underscore, and hyphen
    // This regex ensures only "viewable" and safe characters
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    
    if (!validPattern.test(value)) {
      return { [UsernameError.InvalidCharacters]: true };
    }
    
    return null;
  }

  // validator for password strength
  passwordStrengthValidator (control:AbstractControl) : ValidationErrors | null {
      const value = control.value;

      if (!value) {
          return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const isLengthGood = value.length >= 6;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && isLengthGood;

      return !passwordValid ? {[PasswordError.Strength]: true}: null;
  }

  hasUsernameInvalidError() {
    return this.username.hasError(UsernameError.InvalidCharacters) &&
           (this.username.touched || this.username.dirty);
  }

  hasPasswordMismatchError(){
    return this.registerForm.hasError(PasswordError.Mismatch) && 
    (this.repeated_password.touched || this.repeated_password.dirty);
  }

  hasPasswordWeakError() {
    return this.password.hasError(PasswordError.Strength) &&
    (this.password.touched || this.password.dirty);
  }

  hasAnyPasswordError() {
    return this.hasPasswordWeakError() || this.hasPasswordMismatchError();
  }

  get username() {
    return this.registerForm.controls.username;
  }
  
  get password() {
      return this.registerForm.controls.password;
  }

  get repeated_password() {
      return this.registerForm.controls.repeated_password;
  }

onSignup() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username;
      const password = this.registerForm.value.password;
      
      if (username && password) {
        this.authService.register(username, password).subscribe({
          next: response=>{
          this.authService.setUser(response);
          this.router.navigate(["/"]);
          },
          error: (err) => {
            const message = err.error?.errors?.[0]?.defaultMessage || "Unknown error occurred";
            alert("Register failed:" + message);
          }
        }
        );
      }
      } else {
      alert("Please fill in all required fields correctly.");
    }
  }
}
