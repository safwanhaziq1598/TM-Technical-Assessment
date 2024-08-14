import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginResponse, User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiLoginUrl = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth'

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: User): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.apiLoginUrl, credentials);
  }
}
