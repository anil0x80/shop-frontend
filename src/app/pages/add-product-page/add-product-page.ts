import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { CategoryResponse } from '../../models/category.model';
import { ProductService } from '../../services/product-service';
import { CreateProductRequest } from '../../models/product.model';
import { ProductImageRequest } from '../../models/product-image.model';

@Component({
  selector: 'app-add-product-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-page.html',
  styleUrl: './add-product-page.css'
})
export class AddProductPage {
  
  selectedFiles: File[] = [];
  productForm: FormGroup;
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  categories: CategoryResponse[] | undefined;
  submitError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }
  onFileChange(event: any) {
      this.selectedFiles = Array.from(event.target.files);
  }

  getRandomMockImages(count: number = 5): ProductImageRequest[] {
    const ids = Array.from({ length: 100 }, (_, i) => i + 1);

    // shuffle
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }

    // take first `count` and map to picsum id-URLs
    return ids
      .slice(0, count)
      .map(id => ({
        imageUrl: `https://picsum.photos/id/${id}/200/200`
      }));
  }

  onSubmit(){

     if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.productForm.value;
    const request: CreateProductRequest = {
      productName: formValue.name,
      price: formValue.price,
      categoryId: formValue.category,
      description: formValue.description,
      stock: formValue.stock,
      imageUrls: this.getRandomMockImages()
    };

    // Reset any previous error
    this.submitError = null;

    // Subscribe to the API call
    this.productService.createProduct(request).subscribe({
      next: () => {
        // e.g. navigate away or show a success toast
        console.log('Product created successfully');
      },
      error: (err) => {
        console.error('Create product failed', err);
        // You can inspect err.status / err.error to customize message
        this.submitError = err.error?.message 
          || 'An unexpected error occurred. Please try again.';
      }
    });
  }

  private loadCategories(): void {
      this.categoryService.getAllCategories().subscribe({
        next: (catList) => {
          this.categories = catList;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
        }
      });
    }

  ngOnInit(){
      this.loadCategories();
  }
}
