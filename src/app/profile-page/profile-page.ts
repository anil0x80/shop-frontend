import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, MinLengthValidator} from '@angular/forms';
import {ReactiveFormsModule, Validators,} from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { SectionWrapperComponent } from '../shared/section-wrapper.component';

enum PasswordError {
  Strength = 'passwordStrength',
  Mismatch = 'passwordMismatch',
}

@Component({
  selector: 'app-profile-page',
  imports: [ReactiveFormsModule, CommonModule, SectionWrapperComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})

export class ProfilePage {
    changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    password: new FormControl('', 
        [Validators.required,
           this.passwordStrengthValidator]),
    repeatedPassword: new FormControl('', 
        [Validators.required]),
  }, { validators: this.passwordMatchValidator });

  // validator for password match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.value.password;
    const repeatedPassword = group.value.repeatedPassword;
    
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
    return this.changePasswordForm.hasError(PasswordError.Mismatch) && 
    (this.repeatedPassword.touched || this.repeatedPassword.dirty);
  }

  hasPasswordWeakError() {
    return this.password.hasError(PasswordError.Strength) &&
    (this.password.touched || this.password.dirty);
  }

  hasAnyPasswordError() {
    return this.hasPasswordWeakError() || this.hasPasswordMismatchError();
  }

  get password() {
      return this.changePasswordForm.controls.password;
  }

  get repeatedPassword() {
      return this.changePasswordForm.controls.repeatedPassword;
  }

  onSignup() {
    alert("currentPw: " + this.changePasswordForm.value.currentPassword + "  " + "newPw: " + this.changePasswordForm.value.password);
  }
}
