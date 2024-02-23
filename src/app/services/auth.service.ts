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

  // déconnexion Admin
  déconnexionAdmin(admin: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/logoutadmin`, admin);
  }

  // connexion utilisateur 
  connexionUtilisateur(users: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/login`, users);
  }

  // déconnexion utilisateur 
  deconnexionUtilisateur(users: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/login`, users);
  }

  // mot de passe oublier
  forgetPass(pass: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/forget-password`, pass);
  }

  // deconnexionAutomatique() {
  //   setTimeout(() => {
  //     this.refreshToken(this.onSuccess, this.onError);
  //   }, 10000); // 10 secondes
  // }

  
  // refreshToken(onSuccess: Function, onError: Function) {
  //   // Vérifier si le nombre de rafraîchissements a atteint la limite de 4
  //   const refreshCount = parseInt(
  //     localStorage.getItem('refreshCount') || '0',
  //     10
  //   );
  //   if (refreshCount >= 4) {
  //     // Afficher SweetAlert pour proposer de rafraîchir le token ou se déconnecter
  //     this.showLogoutAlert();
  //   } else {
  //     // Mettre à jour le nombre de rafraîchissements dans le localStorage
  //     localStorage.setItem('refreshCount', (refreshCount + 1).toString());
  //     // Réinitialiser le timer de déconnexion automatique
  //     this.deconnexionAutomatique();
  //   }

  //   // Effectuer le rafraîchissement du token
  //   return this.http.post<any>(${ url }refresh, '').subscribe(
  //     (response: any) => onSuccess(response),
  //     (error: any) => onError(error)
  //   );
  // }

  // onSuccess = (response: any) => {
  //   // Mettre à jour le token
  //   localStorage.setItem('userOnline', JSON.stringify(response));
  //   console.log('voici la reponse du changement du token', response);
  // };

  // onError = (error: any) => {
  //   console.log('Voici les erreurs du changement du token', error);
  // };

  // showLogoutAlert() {
  //   let refresh = 0;
  //   localStorage.setItem('refreshCount', JSON.stringify(refresh));
  //   this.logoutuser();

  //   // this.MessageSucces()
  //   Swal.fire({
  //     title: 'Votre Session a expirer',
  //     text: "Deconnecter vous ou rafraichissez votre token",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui! je raffraichie',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: 'non!',
  //         text: 'non!, je me deconnecte',
  //         icon: 'success',
  //       });
  //     }
  //   });
  // }
}
