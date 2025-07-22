import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginPage } from './login-page/login-page';
import { RegisterPage } from './register-page/register-page';
import { ProductPage } from './product-page/product-page';
import { ProfilePage } from './profile-page/profile-page';

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
        path:'profile',
        component:ProfilePage,
        title:"Profile"
    },
];
