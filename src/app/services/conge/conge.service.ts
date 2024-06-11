import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../../models/Conge';
import { Personnel } from '../../models/Personnel';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  httpClient: any;
  getMaternityLeaveDuration() {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  ajouterConge(conge: FormData): Observable<Conge> {
return this.http.post<Conge>(`${this.baseUrl}/conge/ajouterconge`, conge);
  }

  // Get all Conges
  afficherConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrl}/conge/afficherconges`);
  }

 // Get Conge by ID
 // afficherConge(id: number): Observable<Conge> {
   //return this.http.get<Conge>(`${this.baseUrl}/afficherconge/${id}`);
 // }
 confirmerConge(id: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/confirmerconge/${id}`, {});
}

refuserConge(id: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/refuserconge/${id}`, {});
}

//archive
getArchive():Observable<Conge[]>{
  return this.http.get<Conge[]>(this.baseUrl+"/archive")
}
//ajouter absence
ajouterAbs(id: number): Observable< Personnel> {
  return this.http.post<Personnel>(`${this.baseUrl}/ajouterabsence/${id}`, {});
}

getCurrentUserId(): Observable<number> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

  return this.http.get<number>(`${this.baseUrl}/conge/current-user-id`, { headers });
}


getCongesConfirmes():Observable<Conge[]>{
  return this.http.get<Conge[]>(this.baseUrl+"/congeconfirme")
}
}

