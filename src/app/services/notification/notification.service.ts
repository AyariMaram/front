import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { Notification } from '../../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = "http://localhost:8080/";
  private client: Client;

  constructor(private httpClient: HttpClient) {
    this.client = new Client();
  }

  affichernotifications(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(this.url + "affichernotification");
  }


  supprimerNot(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}supprimernotification/${id}`);
  }

  afficherNot(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}notification/${id}`);
  }

  markNotificationAsRead(notificationId: number): Observable<any> {
    return this.httpClient.put(`${this.url}notification/${notificationId}`, null);
  }

  countNotificationsLu(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}countLu`);
  }
}
