import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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
}
