import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginPage } from './login-page/login-page';
import { RegisterPage } from './register-page/register-page';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },
    {
        path:'sign-in',
        component:LoginPage
    },
    {
        path:'sign-up',
        component:RegisterPage
    }
];
