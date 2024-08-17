import { ProductService } from './../../service/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductDetails, ProductDetailsList } from '../../models/product';

//Angular Material
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'action']
  dataSource = new MatTableDataSource<ProductDetails>([]);
  tableData: ProductDetails[] = [];
  tableData2: ProductDetailsList[] = [];
  productId: string = "";
  token: string = "";
  pageSize: number = 5
  totalItems: number = 100;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProductListData();
  }

  getProductListData() {
    this.token = localStorage.getItem('token')!;

    let indexNumber = 0;
    let pageSize = 5;
    let startDate = '2022-01-25';
    let endDate = '2022-02-16';

    try {
      this.productService.getProductList(this.token).subscribe(
        (data) => {
          console.log(data);
          this.tableData = data;
          this.productId = data[0].id;
          this.dataSource.data = this.tableData;
          this.getProductData(this.token, this.productId, indexNumber, pageSize, startDate,endDate);
        },
        (error) => {
          console.error('Error fetching product list: ', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  getProductData(token: string, productId: string, indexNumber: number, pageSize: number, startDate: string, endDate: string) {

    console.log(productId);
    try {
      this.productService.getProductDetail(token, productId, indexNumber, pageSize, startDate, endDate).subscribe(
        (data) => {
          console.log(data)

          this.tableData2 = data.data;
          console.log(this.tableData2);
        },
        (error) => {
          console.error('Error fetching product data: ', error);
        }
      )

    } catch (error) {
      console.error(error);

    }
  }

  addProduct(){

  }

  editProduct(element: string){

  }

  onPageChange(){


  }
}
