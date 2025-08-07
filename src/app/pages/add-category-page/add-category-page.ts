import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaxService } from '../../services/tax-service';
import { CategoryService } from '../../services/category-service';
import { TaxResponse } from '../../models/tax.model';
import { CreateCategoryRequest, CategoryTaxRequest } from '../../models/category.model';

@Component({
  selector: 'app-add-category-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-category-page.html',
  styleUrl: './add-category-page.css'
})
export class AddCategoryPage implements OnInit{
  private taxService = inject(TaxService)
  private categoryService = inject(CategoryService)
  private formBuilder = inject(FormBuilder)
  
  categoryForm: FormGroup = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(2)]]
    });
  taxes: TaxResponse[] = []
  selectedTaxes: string[] = []
  taxPercentages: { [taxId: string]: number } = {}

  ngOnInit(): void {
      this.taxService.getAllTaxes().subscribe(
        {
          next: response=>{this.taxes = response},
          error: error => {
            console.error('Error fetching taxes:', error);
            this.taxes = [];
          }
        }
      )
  }

  onTaxSelectionChange(taxId: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    
    if (isChecked) {
      // Add tax to selected list if not already present
      if (!this.selectedTaxes.includes(taxId)) {
        this.selectedTaxes.push(taxId);
        // Initialize percentage to 0 when selected
        this.taxPercentages[taxId] = 0;
      }
    } else {
      // Remove tax from selected list and its percentage
      this.selectedTaxes = this.selectedTaxes.filter(id => id !== taxId);
      delete this.taxPercentages[taxId];
    }
    
    console.log('Selected taxes:', this.selectedTaxes);
    console.log('Tax percentages:', this.taxPercentages);
  }

  onTaxPercentageChange(taxId: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const percentage = parseFloat(target.value) || 0;
    this.taxPercentages[taxId] = percentage;
    console.log('Updated tax percentages:', this.taxPercentages);
  }

  getTaxPercentage(taxId: string): number {
    return this.taxPercentages[taxId] || 0;
  }

  onSubmit(): void {
    if (this.categoryForm.valid && this.selectedTaxes.length > 0) {
      // Prepare the taxes array with their percentages
      const taxes: CategoryTaxRequest[] = this.selectedTaxes.map(taxId => ({
        taxId: taxId,
        taxPercent: this.taxPercentages[taxId] || 0
      }));

      // Create the request object
      const createRequest: CreateCategoryRequest = {
        categoryName: this.categoryForm.get('categoryName')?.value,
        taxes: taxes
      };

      console.log('Submitting category:', createRequest);

      // Call the API
      this.categoryService.createCategory(createRequest).subscribe({
        next: (response) => {
          // Reset the form
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating category:', error);
          alert('Error creating category. Please try again.');
        }
      });
    } else {
      alert('Please fill in the category name and select at least one tax.');
    }
  }

  private resetForm(): void {
    this.categoryForm.reset();
    this.selectedTaxes = [];
    this.taxPercentages = {};
  }
}
