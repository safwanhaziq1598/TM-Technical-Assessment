import { ProductService } from './../../service/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { productDetails } from '../../models/product';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  tableData: productDetails[] = [];
  productId: string = "";
  token: string = "";
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProductListData();
  }

  getProductListData() {
    this.token = localStorage.getItem('token')!;

    try {
      this.productService.getProductList(this.token).subscribe(
        (data) => {
          console.log(data);
          this.tableData = data;
          this.productId = data.id;
          this.getProductData(this.token, this.productId);
        },
        (error) => {
          console.error('Error fetching product list: ', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  getProductData(token: string, id: string) {
    try {
      this.productService.getProductDetail(token, id).subscribe(
        (data) => {
          console.log(data)
        },
        (error) => {
          console.error('Error fetching product data: ', error);
        }
      )

    } catch (error) {
      console.error(error);

    }
  }
}
