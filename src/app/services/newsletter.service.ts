import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  // Méthode pour ajouter un newsletter
  postNewsletter(news: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/envoyer/newsletter`, news);
  }

  // lister des newsletters
  getAllNewsletter(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/lister/newsletter`);
  }
}
