import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from '../models/Personnel';


@Injectable({
  providedIn: 'root'
})
export class PersonnelserviceService {


  private baseURL = "http://localhost:8080/personnels/personnellist";

  constructor( private httpClient:HttpClient) { }
  
  getPersonnellist(): Observable<Personnel[]>{
    return  this.httpClient.get<Personnel[]>(`${this.baseURL}`)
  }

  private URL = "http://localhost:8080/personnels/ajouter";

  ajouterPersonnel(personnel: Personnel): Observable<Personnel>{
    return this.httpClient.post<Personnel>(`${this.URL}`,personnel);
  }

  private url = "http://localhost:8080/personnels/get";

  getPersonnelById(id: number): Observable<Personnel> {
    return this.httpClient.get<Personnel>(`${this.url}/${id}`);
  }
  
private modifierurl = "http://localhost:8080/personnels";

//modifierPersonn(id: number, personnel: Personnel): Observable<Object>{
 // return this.httpClient.put(`${this.modifierurl}/${id}`,personnel);
//}

modifierPersonnel(personnel:Personnel,id: number): Observable<Object> {
  return this.httpClient.put(`${this.modifierurl}/modifieruser/${id}`,personnel);
}
private deleteurl = "http://localhost:8080/personnels/delete";

supprimerPersonnel(id:number): Observable<Personnel>{
return this.httpClient.delete<Personnel>(`${this.deleteurl}/${id}`);
}




private baseUrl = 'http://localhost:8080/personnels';
getAllChefs(): Observable<Personnel[]> {
  return this.httpClient.get<Personnel[]>(`${this.baseUrl}/allchef`);
}



private employeeurl = 'http://localhost:8080/personnels';
getAllEmployees(): Observable<Personnel[]> {
  return this.httpClient.get<Personnel[]>(`${this.employeeurl}/allemployee`);
}



//nbr chef
obtenirNombreDeChefs(): Observable<number> {
  return this.httpClient.get<number>(`${this.employeeurl}/nbrchefs`);
}
  //nbr employe
  obtenirNombreDeEmployes(): Observable<number> {
    return this.httpClient.get<number>(`${this.employeeurl}/nbremployes`);
  }
  


  searchUsers(query: string) {
    return this.httpClient.get<any[]>(this.url +'/searchuser', { params: { query: query } });
  }
}