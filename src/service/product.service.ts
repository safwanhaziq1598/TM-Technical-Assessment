import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Params } from '@angular/router';
import { ProductDetails, ProductDetailsList } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrlProductList = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList';
  private apiUrlProductDetails = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/alert/list'

  private productSubject: BehaviorSubject<ProductDetails | null> = new BehaviorSubject<ProductDetails | null>(null);
  private productsList: ProductDetails[] = [];
  constructor(
    private http: HttpClient
  ) { }

  //To add new product and store in the list/array
  addProduct(product: ProductDetails): Observable<void> {
    this.productsList.push(product);
    this.productSubject.next(product);
    return of();
  }

  //Use to get product data to update, remove
  getProduct(): Observable<ProductDetails | null> {
    return this.productSubject.asObservable();
  }

  //Get list of products from the api
  getProductList(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrlProductList, {headers});
  }

  //Get detail for each of the products
  getProductDetail(token: string, productId: string, indexNumber: number, pageSize: number, startDate: string, endDate: string): Observable<any> {

    const url = `${this.apiUrlProductDetails}/${productId}`;
    console.log(url);
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });

    let queryParams = new HttpParams()
      .set('indexNumber', indexNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('startDate', startDate)
      .set('endDate', endDate)

      console.log(queryParams);
    return this.http.get<any>(url, {headers, params: queryParams});
  }

  //Method to update specific product
  updateProduct(updatedProduct: ProductDetails): Observable<void> {
    const index = this.productsList.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.productsList[index] = updatedProduct;
      this.productSubject.next(updatedProduct);
    }
    return of();
  }

  //Method to remove specific product
  removeProduct(id: string): Observable<void> {
    this.productsList = this.productsList.filter(product => product.id !== id);
    this.productSubject.next(null);
    return of();
  }
}


