import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  // Méthode pour lancer une demande de reservation 
  postReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/CreateReservation`, reservation);
  }

  // lister les reservations
  getReservation(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/ListReservations`);
  }


  // Méthode pour accepter une demande de reservation 
  reservationAccepted(reservation: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/AccepterReservation/${reservation}`, reservation);
  }

  // Méthode pour refuser une demande de reservation 
  reservationAnnuler(reservationId: any): Observable<any> {
    return this.http.delete(`${apiUrl}/AnnulerReservation/${reservationId}`);
  }
  
}
