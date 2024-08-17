import { ProductService } from './../../service/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductDetails, ProductDetailsList } from '../../models/product';

//Angular Material
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent implements OnInit{

  displayedColumns: string[] = ['status', 'dateTime', 'remark', 'duration']
  dataSource = new MatTableDataSource<ProductDetailsList>([]);
  tableData: ProductDetailsList[] =[] ;
  productId: string = "";
  token: string = "";
  pageSize: number = 5
  totalItems: number = 100;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = localStorage.getItem('token')!;
      const prodId = params['id'];
      const indexNum = 0;
      const pageSize = 5;
      const startDate = '2022-01-25';
      const endDate = '2022-02-16';

      console.log(token);
      if(prodId){
        this.getProductData(token, prodId, indexNum, pageSize, startDate, endDate)
      }
    })
  }


  getProductData(token: string, productId: string, indexNumber: number, pageSize: number, startDate: string, endDate: string) {

    try {
      this.productService.getProductDetail(token, productId, indexNumber, pageSize, startDate, endDate).subscribe(
        (data) => {
          console.log(data)

          this.tableData = data.data;
          this.dataSource.data = this.tableData;
          console.log(this.tableData);
        },
        (error) => {
          console.error('Error fetching product data: ', error);
        }
      )

    } catch (error) {
      console.error(error);

    }
  }

  onPageChange(){


  }
}
