import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CategoryResponse } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  getProductById(id:string){


    return {
    product_id: id,
    product_name: 'Temporary Product',
    price: 100,
    description: 'This is a temporary product for testing purposes.',
    stock: 10,
    images: ['https://picsum.photos/500','https://picsum.photos/700','https://picsum.photos/600','https://picsum.photos/400','https://picsum.photos/300'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
    category_id: 'default-category'
   }//temp data 
  }
  getProductsByCategory(category:CategoryResponse){
    const products:Product[] = [];
    for (let  i = 0;  i< 7; i++) {
      const element ={
    product_id: "12",
    product_name: 'Temporary Product',
    price: 100,
    description: 'This is a temporary product for testing purposes.',
    stock: 10,
    images: ['https://picsum.photos/500','https://picsum.photos/700','https://picsum.photos/600','https://picsum.photos/400','https://picsum.photos/300'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
    category_id: category.id
      }//temp data 
    products.push(element)
    };
    return products;
  }
  
  getRandomProductsByCategory(category:CategoryResponse, amount:number){
   const products:Product[] = [];
    for (let  i = 0;  i< amount; i++) {
      const element ={
    product_id: "12",
    product_name: 'Temporary Product',
    price: 100,
    description: 'This is a temporary product for testing purposes.',
    stock: 10,
    images: ['https://picsum.photos/500','https://picsum.photos/700','https://picsum.photos/600','https://picsum.photos/400','https://picsum.photos/300'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
    category_id: category.id
      }//temp data 
    products.push(element)
    };
    return products;
  }
   
}
