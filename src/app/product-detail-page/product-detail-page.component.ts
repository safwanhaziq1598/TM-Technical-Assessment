import { ProductService } from './../../service/product.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDetails, ProductDetailsList } from '../../models/product';
import { ActivatedRoute } from '@angular/router';

//Services
import { AuthService } from '../../service/auth.service';

//Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  provideNativeDateAdapter,
  MatNativeDateModule,
} from '@angular/material/core';
import moment, { duration } from 'moment';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }, // Use MAT_DATE_FORMATS
    { provide: DateAdapter, useClass: MomentDateAdapter }, // Provide MomentDateAdapter
    provideNativeDateAdapter(),
  ],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent implements OnInit {
  displayedColumns: string[] = ['status', 'dateTime', 'remark', 'duration'];
  dataSource = new MatTableDataSource<ProductDetailsList>([]);
  tableData: ProductDetailsList[] = [];
  productId: string = '';
  token: string = '';
  indexNum: number = 0;
  pageSize: number = 5;
  totalItems: number = 100;
  startDate: Date;
  endDate: Date;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = localStorage.getItem('token')!;
      this.productId = params['id'];
      this.indexNum = 0;
      this.pageSize = 5;

      const today = new Date();
      this.endDate =new Date(moment(today).format('YYYY-MM-DD'));
      const yesterday = new Date().setDate(today.getDate() - 1);
      this.startDate = new Date(moment(yesterday).format('YYYY-MM-DD'));

      // console.log('Start Date:', this.startDate);
      // console.log('End Date:', this.endDate);

    });

    if (this.productId) {
      this.getProductData(
        this.token,
        this.productId,
        this.indexNum,
        this.pageSize,
        this.startDate,
        this.endDate
      );
    }
  }

  getProductData(
    token: string,
    productId: string,
    indexNumber: number,
    pageSize: number,
    startDate: Date,
    endDate: Date
  ) {
    try {
      this.productService
        .getProductDetail(
          token,
          productId,
          indexNumber,
          pageSize,
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0]
        )
        .subscribe(
          (data) => {
            // console.log(startDate);
            // console.log(endDate);
            // console.log(data);

            this.tableData = data.data.map((item : ProductDetailsList) => ({
              ...item,
              dateTime: moment(item.dateTime).format('YYYY/MM/DD h:mm:ss a'),
            }));
            this.dataSource.data = this.tableData;
            console.log(this.tableData);
          },
          (error) => {
            console.error('Error fetching product data: ', error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  }

  onStartDateChange(event: any): void {
    this.startDate = event.value;
    this.startDate.setDate(this.startDate.getDate() + 1)
    // console.log(this.startDate.setDate(this.startDate.getDate() + 1));
    this.applyDateFilter();
    this.startDate.setDate(this.startDate.getDate() - 1)
  }

  onEndDateChange(event: any): void {
    this.endDate = event.value;
    this.endDate.setDate(this.endDate.getDate() + 1)
    // console.log(this.endDate.setDate(this.endDate.getDate() + 1));
    this.applyDateFilter();
    this.endDate.setDate(this.endDate.getDate() - 1)
  }

  applyDateFilter() {
    try {
      this.getProductData(
        this.token,
        this.productId,
        this.indexNum,
        this.pageSize,
        this.startDate,
        this.endDate
      );
    } catch (error) {
      console.error(error);
    }
  }

  onPageChange(event: PageEvent) {
    console.log(event)
  }
}
