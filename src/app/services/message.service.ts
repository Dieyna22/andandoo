import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) { }

  // Méthode pour envoyer un message
  postSms(sms: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/envoyer`, sms);
  }

  // lister des messages
  getAllSms(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/listMessage`);
  }

  sendResponse(send:any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/repondre/Message`, send);
  }

}
