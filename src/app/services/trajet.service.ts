import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  constructor(private http: HttpClient) { }

  // lister des trajets
  getAllTrajets(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/ListTrajet`);
  }

  // lister mes trajets
  getMesTrajets(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/mestrajets`);
  }

  // Méthode pour ajouter un trajet
  postTrajet(trajet: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/CreateTrajet`, trajet);
  }

  // Méthode pour affichr les détails d'un trajet
  detailsTrajet(trajet: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/DetailsTrajet/${trajet}`, trajet);
  }

  // Méthode pour supprimer un trajet
  deleteTrajet(trajetId: any): Observable<any> {
    return this.http.delete(`${apiUrl}/DeleteTrajet/${trajetId}`);
  }

}
