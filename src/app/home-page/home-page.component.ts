import { ProductService } from './../../service/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { productDetails } from '../../models/product';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  tableData: productDetails[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const token = localStorage.getItem('token')!;

    try {

      this.productService.getProductList(token).subscribe((data) => {
        console.log(data);
        this.tableData = data;
      },
    (error) => {
      console.error('Error fetching product list: ', error);
    });
    } catch (error) {
      console.error(error);
    }
  }
}
