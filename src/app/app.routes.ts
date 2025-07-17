import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LoginPage } from './login-page/login-page';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },
    {
        path:'sign-in',
        component:LoginPage
    }
];
