import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-page.html',
  styleUrl: './add-product-page.css'
})
export class AddProductPage {
  
  selectedFiles: File[] = [];
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: [null],
      category: ['', Validators.required]
    });
  }
  onFileChange(event: any) {
      this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit() {
    if (this.productForm.valid) {
    }
  }
}
