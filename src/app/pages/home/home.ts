import { Component, inject, OnInit } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { CategoryResponse } from '../../models/category.model';
import { ProductResponse } from '../../models/product.model';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  categories: CategoryResponse[] | undefined;
  productsByCategory = new Map<CategoryResponse, ProductResponse[]>();
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadCategoriesAndProducts();
  }

  private loadCategoriesAndProducts(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (catList) => {
        this.categories = catList;
        this.loadProductsForCategories(catList);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Failed to load categories';
        this.isLoading = false;
      }
    });
  }

  private loadProductsForCategories(categories: CategoryResponse[]): void {
    let completedRequests = 0;
    const totalRequests = categories.length;

    if (totalRequests === 0) {
      this.isLoading = false;
      return;
    }

    categories.forEach(cat => {
      this.productService.getRandomProductsByCategory(cat.id, 5).subscribe({
        next: (products) => {
          this.productsByCategory.set(cat, products);
          completedRequests++;
          
          // Check if all requests are completed
          if (completedRequests === totalRequests) {
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error(`Error loading products for category ${cat.categoryName}:`, error);
          completedRequests++;
          
          // Still count as completed even if it failed
          if (completedRequests === totalRequests) {
            this.isLoading = false;
          }
        }
      });
    });
  }
}