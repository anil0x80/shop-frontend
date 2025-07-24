import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getCategories(): Category[] {
    return [
      { category_id: "1", category_name: "Computers" },
      { category_id: "2", category_name: "Cars" },
      { category_id: "3", category_name: "TVs" },
      { category_id: "4", category_name: "Fridge" }
    ];
  }
}
