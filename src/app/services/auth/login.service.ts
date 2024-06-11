import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Personnel } from '../../models/Personnel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private httpClient:HttpClient){  }

url="http://localhost:8080/auth/login"


userlogin(personnel: Personnel): Observable<Personnel>{
  return this.httpClient.post<Personnel>(`${this.url}`,personnel);
}



}





