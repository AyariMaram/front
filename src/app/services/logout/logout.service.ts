import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from '../../models/Personnel';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private httpClient:HttpClient){  }

url="http://localhost:8080/logout"
 

userlogout(personnel: Personnel): Observable<Personnel>{
  return this.httpClient.post<Personnel>(`${this.url}`,personnel);
}

  }

