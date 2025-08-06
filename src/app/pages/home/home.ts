import { Component, inject, OnInit } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { CategoryResponse } from '../../models/category.model';
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

  categories:CategoryResponse[] | undefined;
  productsByCategory= new Map<CategoryResponse,Product[]>;

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(catList => {
      this.categories = catList;

      // for each category, fetch its products
      catList.forEach(cat => {
        this.productsByCategory.set(cat, this.productService
            .getRandomProductsByCategory(cat, 5))
      });
    });
  }

  
}
