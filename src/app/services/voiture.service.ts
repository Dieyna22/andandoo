import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http: HttpClient) { }

  // lister des voitures
  getAllVoitures(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/SeeMoreVoiture`);
  }

  // lister des voitures
  getVoituresDisponibles(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/listerVoiture/Disponible`);
  }

  // lister des voitures
  getVoituresNonDisponibles(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/listerVoiture/Indisponible`);
  }

  // Méthode pour ajouter une voiture
  postVoitures(car: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/AjouterVoiture`, car);
  }

  // Méthode pour ajouter une voiture
  updateVoitures(carId:any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/ModifierVoiture/${carId}`, "");
  }

}
