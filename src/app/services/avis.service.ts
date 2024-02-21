import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  constructor(private http: HttpClient) { }

  sendAvis(send: any,id:any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/Donner/avis/${id}`, send);
  }

  getAllAvis(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/show/avis`);
  }


}
