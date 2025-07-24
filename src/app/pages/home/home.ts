import { Component, inject, OnInit } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService)

  categories:Category[] | undefined;
  productsByCategory= new Map<Category,Product[]>;

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    for (let index = 0; index < this.categories.length; index++) {
      const category = this.categories[index];
      const products = this.productService.getRandomProductsByCategory(category,5);
      this.productsByCategory.set(category,products);
    }
  }

  
}
