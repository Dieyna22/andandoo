import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  // lister les clients
  getAllClients(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/listerClient`);
  }

  // lister les conducteurs
  getAllConducteur(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/listerChauffeur`);
  }

  // lister des utilisateurs
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/listerUtilisateur`);
  }

  // lister des utilisateurs
  statUser(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/nombreutilisateur`);
  }

  // bloquer temporairement un conducteur
  temporaireblock(conducteurId:any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/BlockerTemporairement/${conducteurId}`, "");
  }

  // bloquer definitivement un conducteur
  definiveblock(conducteurId: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/BlockerDefinitivement/${conducteurId}`,"");
  }

  // débloquer un conducteur bloquer temporairement
  debloquer(conducteurId: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/Debloquer/${conducteurId}`, "");
  }

  //modification du profil des utilisateurs
  updateUser(userId: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/Update/Profile/${userId}`, userId);
  }
}
