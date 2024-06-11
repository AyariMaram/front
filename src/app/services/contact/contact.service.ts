import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../../models/Contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseURL = "http://localhost:8080/contact";

  constructor( private httpClient:HttpClient) { }
  
  getcontact(): Observable<Contact[]>{
    return  this.httpClient.get<Contact[]>(`${this.baseURL}`)
  }
}
