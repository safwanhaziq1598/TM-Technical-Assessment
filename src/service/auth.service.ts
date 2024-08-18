import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserLoginResponse, User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiLoginUrl = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth'
  isHome: boolean = false;
  isDetail: boolean = false
  constructor(
    private http: HttpClient
  ) { }

  login(credentials: User): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.apiLoginUrl, credentials)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 401) {
      errorMessage = 'Invalid username or password. Please try again.';
    }
    return throwError(() => new Error(errorMessage));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
