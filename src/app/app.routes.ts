import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent, data: { title: 'Login'}},
  { path: 'home', component: HomePageComponent, data: { title: 'Home'}},
  { path: 'product', component: ProductDetailPageComponent, data: { title: 'Product Detail'}}
];
