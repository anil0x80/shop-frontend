import { Component,inject, OnInit} from '@angular/core';
import { ProductService} from '../../services/product-service'; 
import { ProductResponse } from '../../models/product.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ImageSlider } from '../../components/image-slider/image-slider';
import { AddToCartButton } from "../../components/add-to-cart-button/add-to-cart-button";
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, ImageSlider, AddToCartButton],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage implements OnInit{
  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  
  productId: string | null = null;
  product: ProductResponse | undefined;
  categoryName:string = "";
  user = this.authService.user();
  images: string[] = [];

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) return console.error('Product ID is null');

      this.productService.getProductById(id)
        .subscribe({
          next: productData => {
            this.product = productData
            console.log(this.product)

            for (const item of this.product.images || []) {
              console.log(item.imageUrl)
              this.images.push(item.imageUrl);
            }
            this.categoryService.getCategory(this.product.categoryId)
            .subscribe({
              next: categoryData =>{
                this.categoryName = categoryData.categoryName;
              } 
            })
          },
          error: err => console.error('error getProductById', err)
        });
  }

  addProductToCart(quantity: number){
    if(this.user){
      // Check if product exists before accessing its properties
      if (!this.product) {
        console.error('Product not loaded');
        return;
      }
      
      const cartRequest = {
        userId: this.user.id,
        productId: this.product.id, 
        quantity: quantity // Use the quantity from the component
      };
      
      this.cartService.addItemToCart(cartRequest).subscribe({
        next: value => {
          this.router.navigate(['/cart']);
        },
        error: error => {
          console.error('Error adding item to cart:', error);
          
          // Handle specific error scenarios
          let errorMessage = 'Unable to add item to cart. ';
          
          switch (error.status) {
            case 400:
              errorMessage += 'Invalid request or insufficient stock.';
              break;
            case 401:
              errorMessage += 'Please sign in again.';
              this.router.navigate(['/sign-in']);
              return;
            case 404:
              errorMessage += 'Product not found.';
              break;
            case 409:
              errorMessage += 'Product is out of stock.';
              break;
            case 500:
              errorMessage += 'Server error. Please try again.';
              break;
            default:
              errorMessage += 'Please check your connection and try again.';
          }
          
          alert(errorMessage);
        }
      });
    }
    else{
      this.router.navigate(['/sign-in']);
    }
  }
}