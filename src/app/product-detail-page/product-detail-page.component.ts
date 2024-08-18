import { ProductService } from './../../service/product.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductDetails, ProductDetailsList } from '../../models/product';
import { ActivatedRoute } from '@angular/router';

//Services
import { AuthService } from '../../service/auth.service';

//Angular Material
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatLabel,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }, // Use MAT_DATE_FORMATS
    { provide: DateAdapter, useClass: MomentDateAdapter } // Provide MomentDateAdapter
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
  startDate: Date | null = null;
  endDate: Date | null = null;


  constructor(
    private authService:AuthService,
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

  applyDateFilter(){

  }

  onPageChange(){


  }
}
