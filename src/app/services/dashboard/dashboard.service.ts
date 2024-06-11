import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountType } from '../../models/charts/CountType';
import { CountRole } from '../../models/charts/CountRole';
import { CountSexe } from '../../models/charts/CountSexe';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getPercentageGroupByType(): Observable<CountType[]> {
    return this.http.get<CountType[]>(`${this.baseUrl}/percentCountType`);
  }

  getPercentageGroupByRole(): Observable<CountRole[]> {
    return this.http.get<CountRole[]>(`${this.baseUrl}/personnels/percentageByRole`);
  }

  getCountByRole(): Observable<CountRole[]> {
    return this.http.get<CountRole[]>(`${this.baseUrl}/personnels/countByRole`);
  }

  getPercentageGroupBySexe(): Observable<CountSexe[]> {
    return this.http.get<CountSexe[]>(`${this.baseUrl}/personnels/percentageBySexe`);
  }


  getPercentageGroupByTypeForUser(userId: number): Observable<CountType[]> {
    return this.http.get<CountType[]>(`${this.baseUrl}/percentCountType/${userId}`);
  }


  getPercentageBystatut(userId: number): Observable<CountType[]> {
    return this.http.get<CountType[]>(`${this.baseUrl}/count-by-statut/${userId}`);
  }

  getPercentageBySexeForEmployees(): Observable<CountSexe[]> {
    return this.http.get<CountSexe[]>(`${this.baseUrl}/sexpercentEmployees`);
  }



//
  getCountCongesByUser(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countCByUser/${userId}`);
  }

  getCountAbsencesByUser(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countAByUser/${userId}`);
  }
  //
  getCountCongesBychef(service: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countCBychef/${service}`);
  }

  getCountAbsencesBychef(service: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countABychef/${service}`);
  }

  getCountSanctionsByUser(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countSByUser/${userId}`);
  }
  getSoldeByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/personnels/solde/${userId}`);
  }
//

  congeBytype(userId: number): Observable<CountType[]> {
    return this.http.get<CountType[]>(`${this.baseUrl}/count-by-type/${userId}`);
  }




  congeBytypechef(service: string): Observable<CountType[]> {
    return this.http.get<CountType[]>(`${this.baseUrl}/count-by-type-chef/${service}`);
  }

  congeBystatutchef(service: string): Observable<CountType[]> {
    return this.http.get<CountType[]>(`${this.baseUrl}/count-by-statut-chef/${service}`);
  }

}
