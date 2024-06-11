import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  
  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get('http://localhost:8080/auth/profile', { headers });
  }

  getUserSex(): Observable<string> {
    return this.getUserProfile().pipe(
      map((profile: any) => profile.sexe)
    );
  }

getUserId():Observable<number> {
  return this.getUserProfile().pipe(
    map((profile: any) => profile.id)
  );
}

  getUserCivilStatus(): Observable<string> {
    return this.getUserProfile().pipe(
      map((profile: any) => profile.statut)
    );
  }
  getUserSolde(): Observable<string> {
    return this.getUserProfile().pipe(
      map((profile: any) => profile.solde)
    );
  }
  baseUrl = "http://localhost:8080"

  getCountOfCongesByUser(userId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/countByUser/${userId}`);
  }
  getCountOfCongesConfirmer(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}/confirmed/count-and-percentage`);
  }
  getUserPassword(): Observable<string>
{
return this.getUserProfile().pipe(
  map((profile: any) => profile.password)

);
}  url = "http://localhost:8080/personnels";

  searchUsers(query: string) {
    return this.http.get<any[]>(this.url +'/searchuser', { params: { query: query } });
  }
  searchConge( type:string) {
    return this.http.get<any[]>(this.url +'/searchconge', { params: {  type : type } });
  }
  searchCongess( query:string) {
    return this.http.get<any[]>(this.url +'/searchconge', { params: {  query: query } });
  }

  searchConges(query: string) {
    return this.http.get<any[]>(this.url + '/searchconge', { params: { query: query } });
  }
  
}

