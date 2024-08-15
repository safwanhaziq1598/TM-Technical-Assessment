import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

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

  getProductDetail(token: string, productId: string): Observable<any> {
    const url = `${this.apiUrl2}/${productId}`;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });


    return this.http.get<any>(url, {headers});
  }
}


//indexNum: number, pageSize: number, startDate: string, endDate: string
