import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }





  getImage(userId: number, fileName: string): Observable<Blob> {
    return this.http.get(`http://localhost:8080/conge/images/${userId}/${fileName}`, { responseType: 'blob' });
  }
}
