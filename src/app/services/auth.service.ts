import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  // inscription
  inscription(user: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/register`, user);
  }

  register(users: any, onSuccess: Function, onError: Function) {
    this.http.post(`${apiUrl}inscriptionProprietaire`, users).subscribe(
      (response: any) => onSuccess(response),
      (error: any) => onError(error)
    );
  }

  // connexion Admin
  connexionAdmin(admin: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/loginadmin`, admin);
  }

  login(user: any, onSuccess: Function) {
    return this.http
      .post(`${apiUrl}/loginadmin`, user)
      .subscribe((reponse: any) => onSuccess(reponse));
  }

  // déconnexion Admin
  déconnexionAdmin(admin: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/logoutadmin`, admin);
  }

  // connexion utilisateur 
  connexionUtilisateur(users: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/login`, users);
  }

}
