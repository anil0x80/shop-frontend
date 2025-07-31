import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { ProductPage } from './pages/product-page/product-page';
import { AddProductPage } from './pages/add-product-page/add-product-page';

export const routes: Routes = [
    {
        path:'',
        component:Home,
        title:"Vetra"
    },
    {
        path:'sign-in',
        component:LoginPage,
        title:"Sign In"
    },
    {
        path:'sign-up',
        component:RegisterPage,
        title:"Sign Up"
    },
    {
        path: 'product/:id',
        component:ProductPage,
    },
    {
        path:'add-product',
        component:AddProductPage,
    }
];
