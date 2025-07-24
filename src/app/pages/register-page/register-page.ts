import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, MinLengthValidator} from '@angular/forms';
import {ReactiveFormsModule, Validators,} from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

enum PasswordError {
  Strength = 'passwordStrength',
  Mismatch = 'passwordMismatch',
}

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})

export class RegisterPage {
    registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
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

  get password() {
      return this.registerForm.controls.password;
  }

  get repeated_password() {
      return this.registerForm.controls.repeated_password;
  }

  onSignup() {
    alert("username: " + this.registerForm.value.username + "  " + "password: " + this.registerForm.value.password);
  }
}
