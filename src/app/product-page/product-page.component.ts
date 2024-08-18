import { ProductService } from './../../service/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

//Models
import { ProductDetails, ProductDetailsList } from './../../models/product';

//Services
import { AuthService } from '../../service/auth.service';

//Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  displayedColumns: string[] = ['productName', 'action'];
  dataSource = new MatTableDataSource<ProductDetails>([]);
  tableData: ProductDetails[] = [];
  productId: string = '';
  token: string = '';
  pageSize: number = 5;
  totalItems: number = 100;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token')!;

    this.getProductListData();

    this.productService.getProduct().subscribe((item) => {
      if (item) {
        this.tableData.push(item);
        this.dataSource.data = this.tableData;
      }
    });
  }

  //Fetch list of products available and display in the table
  getProductListData() {
    try {
      this.productService.getProductList(this.token).subscribe(
        (data: ProductDetails[]) => {
          console.log(data);
          this.tableData = data;
          this.dataSource.data = this.tableData;
        },
        (error) => {
          console.error('Error fetching product list: ', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  //When click on the product it will navigate to product detail to display relevent data of selected product
  goToProduct(element: ProductDetails) {
    this.router.navigate(['/product_detail'], {
      queryParams: {
        id: element.id,
      },
    });
  }

  //Method to open AddOroductDialog and add new product
  addProduct() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((res: ProductDetails) => {
      if (res) {
        this.productService.addProduct(res).subscribe(() => {
          this.tableData.push(res);
          this.dataSource.data = this.tableData;
          console.log(this.dataSource.data);
        });
      }
    });
  }

  //Method to open EditProductDialog to edit selected product
  editProduct(element: ProductDetails) {
    console.log(element);

    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: {
        id: element.id,
        productName: element.productName,
        url: element.url,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      console.log(this.dataSource.data);

      if (res.action == 'update') {
        const index = this.dataSource.data.findIndex(
          item => item.id == res.data.id
        );
        console.log(index);

        if(index >= 0){
          this.dataSource.data[index] = res.data;
          console.log(this.dataSource.data);
          this.dataSource._updateChangeSubscription();
        }
      }

      if (res.action == 'remove') {
        const index = this.dataSource.data.findIndex(
          item => item.id === res.data.id
        );
        console.log(index);

        if (index >= 0) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }

  onPageChange() {}
}
