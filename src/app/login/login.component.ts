import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showSteps: boolean = true;
  choixFormulaire: boolean = true;

  user: any;
  credentials: any;
  loading!: boolean;
  userConnected: any;
  errorMsg: any;
  experience: any;
  realisation: any;
  userConnect: any;

  bdUsers: any;


  constructor(private route: Router) { }


  public afficherFormulaire() {
    this.choixFormulaire = !this.choixFormulaire;
  }

  public afficherStep() {
    this.showSteps = !this.showSteps;
  }

  submitFunction(event: Event) {
    event.preventDefault();
  }

  // Nos attributs

  activite: string = '';
  image: string = '';
  emailLogin: string = "";
  passwordLogin: string = "";
  experimente: string = "";
  novice: string = "";
  prenom: string = "";
  nom: string = "";
  email: string = "";
  password: string = "";
  adresse: string = "";
  region: string = "";
  statExp: string = "";
  statNov: string = "";
  users: any;


  // connexion

 




  // sweetalert
  showMessage(icon: any, titre: any, texte: any) {
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
    })
  }

  userFound: any;

  connexion() {
    // alert(this.emailLogin);
    // alert(this.passwordLogin);

    // EmailRegex
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if (this.emailLogin == "" || this.passwordLogin == "") {
      this.alertMessage("error", "Attention", "Veillez renseigner tous les champs");
    } else if (!this.emailLogin.match(emailPattern)) {
      this.alertMessage("error", "Attention", "Veillez revoir votre email");
    } else if (this.passwordLogin.length < 5) {
      this.alertMessage("error", "Attention", "Le mot de passe doit contenir plus de huit caractéres");
    } else {
      this.userFound = this.bdUsers.find((element: any) => element.email == this.emailLogin && element.password == this.passwordLogin);
      if (this.userFound) {
        if (this.userFound.role == 'admin') {
          this.route.navigate(['accueilAdmin']);
          this.alertMessage("success", "Bravo", "Vous etes connecté avec succés");
        }
        if (this.userFound.role == 'experimente') {
          this.route.navigate(['accueilEntrepreneur']);
          this.alertMessage("success", "Bravo", "Vous etes connecté avec succés");
        }
        if (this.userFound.role == 'novice') {
          this.route.navigate(['accueilUser']);
          this.alertMessage("success", "Bravo", "Vous etes connecté avec succés");
        }
      }
      else {
        this.alertMessage("error", "Oups!", "Le compte n'exite pas ou est désactiver");
      }
    }

  }

  // Initialiser le contenu actuel
  currentContent: string = '';

  // Mettre à jour le contenu actuel
  showComponant(contentId: string): void {
    this.currentContent = contentId;
  }

  // Initialiser le contenu actuel
  currentStep: string = '';

  // Mettre à jour le contenu actuel
  showStep(contentId: string): void {
    this.currentStep = contentId;
  }

  



  // sweetAlert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }
}
