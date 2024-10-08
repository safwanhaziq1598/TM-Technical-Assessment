import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AuthGuard } from '../guard/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent, data: { title: 'Login'}},
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    data: { title: 'Home'},
    children: [
        { path: 'product', component: ProductPageComponent, data: { title: 'Product'}},
        { path: 'product_detail', component: ProductDetailPageComponent, data: { title: 'Product Detail'}}

    ]
  },
];
