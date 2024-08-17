import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { ProductDetailsList } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl1 = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList';
  private apiUrl2 = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/alert/list'
  constructor(
    private http: HttpClient
  ) { }

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


//indexNum: number, pageSize: number, startDate: string, endDate: string
