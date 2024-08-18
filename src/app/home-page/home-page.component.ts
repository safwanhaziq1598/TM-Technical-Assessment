import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Components
import { ProductPageComponent } from "../product-page/product-page.component";
import { ProductDetailPageComponent } from "../product-detail-page/product-detail-page.component";

//Models
import { ProductDetails, ProductDetailsList } from '../../models/product';

//Service
import { ProductService } from './../../service/product.service';
import { AuthService } from '../../service/auth.service';

//Angular Material
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    ProductPageComponent,
    ProductDetailPageComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {


  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }


  goHome(){
    this.router.navigate(['/home/product']);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
