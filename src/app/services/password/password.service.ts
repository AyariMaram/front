import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ChangePasswordRequest } from '../../models/changePasswordRequest';


@Injectable({
  providedIn: 'root'
})export class PasswordService {
  private url = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  changePassword(request: ChangePasswordRequest, token: string): Observable<any> {
    return this.http.patch<any>(`${this.url}/personnels`, request, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  //forgot password service here
  private baseUrl = 'http://localhost:8080/mail'; 


  forgotPassword(email: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/forgot-password?email=${email}`, null);
  }


  private apiUrl = 'http://localhost:8080/mail';

  
  setPassword(email: string, newPassword: string, confirmPassword: string): Observable<string> {
    const params = new HttpParams()
      .set('email', email)
      .set('newPassword', newPassword)
      .set('confirmPassword', confirmPassword);

    return this.http.put<string>(`${this.apiUrl}/set-password`, null, { params: params });
  }




  changPassword(email: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'oldPassword': oldPassword 
    });

    const params = new HttpParams()
      .set('email', email)
      .set('newPassword', newPassword)
      .set('confirmPassword', confirmPassword);

    const options = { headers: headers, params: params };

    return this.http.put<string>(`${this.baseUrl}/change-password`, {}, options);
  }


  

}

  

  

