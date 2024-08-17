import { ProductService } from './../../service/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductDetails, ProductDetailsList } from '../../models/product';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

//Angular Material
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ProductPageComponent } from "../product-page/product-page.component";
import { ProductDetailPageComponent } from "../product-detail-page/product-detail-page.component";
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
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
  ) {}

  ngOnInit() {

    this.authService.isHome = true;
  }


  goHome(){

  }

  logout(){

  }

}
