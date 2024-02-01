import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  
  constructor(private http: HttpClient) { }
  
  // lister les zones
  getAllZones(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/listzone`);
  }

  // Méthode pour ajouter un zone
  postZone(zone: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/createzone`, zone);
  }

  // Méthode pour supprimer un zone
  deleteZone(zoneId: any): Observable<any> {
    return this.http.delete(`${apiUrl}/deletezone/${zoneId}`);
  }


}
