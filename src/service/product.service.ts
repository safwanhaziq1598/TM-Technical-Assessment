import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Params } from '@angular/router';
import { ProductDetails, ProductDetailsList } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl1 = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList';
  private apiUrl2 = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/alert/list'

  private productSubject: BehaviorSubject<ProductDetails | null> = new BehaviorSubject<ProductDetails | null>(null);
  private productsList: ProductDetails[] = [];
  constructor(
    private http: HttpClient
  ) { }

  addProduct(product: ProductDetails): Observable<void> {
    this.productsList.push(product);
    this.productSubject.next(product);
    return of();
  }

  getProduct(): Observable<ProductDetails | null> {
    return this.productSubject.asObservable();
  }

  getProductList(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl1, {headers});
  }

  getProductDetail(token: string, productId: string, indexNumber: number, pageSize: number, startDate: string, endDate: string): Observable<any> {

    const url = `${this.apiUrl2}/${productId}`;
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

}


