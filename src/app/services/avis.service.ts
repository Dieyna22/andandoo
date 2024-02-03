import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  constructor(private http: HttpClient) { }
  sendAvis(send: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/Donner/avis`, send);
  }

}
