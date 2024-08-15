import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList';

  constructor(
    private http: HttpClient
  ) { }

  getProductList(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, {headers});
  }
}
