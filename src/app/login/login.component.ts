 import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ZoneService } from '../services/zone.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Nos attributs
    //connexion
  emailLogin: string = "";
  passwordLogin: string = "";
    //inscription
  prenom: string = "";
  nom: string = "";
  email: string = "";
  password: string = "";
  telephone: string = "";
  profil: any ;
  zone: string = "";
  conducteur: string = "";
  passager: string = "";
  permis: any;
  licence: any;
  role: string = "";

  activite: string = '';
  image: string = '';

  chauffeur: string = "";
  client: string = "";

  users: any;
  showSteps: boolean = true;
  choixFormulaire: boolean = true;
 

  tabZone: any;


  constructor(private route: Router, private auth: AuthService, private lieu: ZoneService , private authUser:AuthService, private logout:AuthService, private registerclient:AuthService, private registerConducteur:AuthService) { }

  ngOnInit() {
    this.listeZone() 
  }


  public afficherFormulaire() {
    this.choixFormulaire = !this.choixFormulaire;
  }

  public afficherStep() {
    this.showSteps = !this.showSteps;
  }

  submitFunction(event: Event) {
    event.preventDefault();
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

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.profil= event.target.files[0] as File;
  }

  getFilePermmis(event: any) {
    console.warn(event.target.files[0]);
    this.permis = event.target.files[0] as File;
  }

  getFileLicence(event: any) {
    console.warn(event.target.files[0]);
    this.licence = event.target.files[0] as File;
  }

  // connexion 
  connexion() {
    let user = {
      "email": this.emailLogin,
      "password": this.passwordLogin
    };

    if (this.emailLogin === 'admin@gmail.com' && this.passwordLogin === 'admin123') {
      // Connexion en tant qu'admin
      alert('Ok');
      this.auth.connexionAdmin(user).subscribe(
        (response) => {
          console.log(response);

          this.auth.isAuthenticated = true;

          localStorage.setItem('userOnline', JSON.stringify(response));
          this.route.navigate(['/admin']);
        },
        (err) => {
          let message = err.error.error;
          console.warn(err);
          this.alertMessage("error", "Oops...", message);
        }
      );
    } else {
      // Connexion en tant qu'utilisateur normal
      this.authUser.connexionUtilisateur(user).subscribe(
        (response) => {

          this.auth.isAuthenticated = true;

          localStorage.setItem('userOnline', JSON.stringify(response));
          if (response.original.data.statusCode == 200) {
            this.alertMessage("success", "Good job!", "Connexion Reussi");
            this.route.navigate(['/accueilUtilisateur']);
          } else {
            console.log(response.original.data.statusCode);
          }
        },
        (err) => {
          let message = err.error.error;
          console.warn(message);
          this.alertMessage("error", "Oops...", message);
        }
      );
    }
  }

  register() {
    this.role = 'client';
    let formData = new FormData();
    formData.append("Email", this.email);
    formData.append("password", this.password);
    formData.append("Nom", this.nom);
    formData.append("Prenom", this.prenom);
    formData.append("Telephone", this.telephone);
    formData.append("zone_id", this.zone);
    formData.append("ImageProfile", this.profil);
    formData.append("role", this.role);

    if (
      this.nom == '' ||
      this.prenom == '' ||
      this.telephone == '' ||
      this.email == '' ||
      this.password == '' ||
      this.zone == ''
    ) {
      this.alertMessage("error", "Ooops...", "veuillez remplir tous les champs");
    } else {
      this.registerclient.inscription(formData).subscribe(
        (reponse) => {
          console.log(reponse);
          this.viderChamp();
          this.alertMessage("success", "Good...","success");

        },
        (error) => { 
          console.log(error);
        }
      )
    }
  }

  inscriptionConducteur() {
    this.role = 'chauffeur';
    let formData = new FormData();
    formData.append("Email", this.email);
    formData.append("password", this.password);
    formData.append("Nom", this.nom);
    formData.append("Prenom", this.prenom);
    formData.append("Telephone", this.telephone);
    formData.append("zone_id", this.zone);
    formData.append("ImageProfile", this.profil);
    formData.append("role", this.role);
    formData.append("PermisConduire", this.permis);
    formData.append("Licence", this.licence);

    if (
      this.nom == '' ||
      this.prenom == '' ||
      this.telephone == '' ||
      this.email == '' ||
      this.password == '' ||
      this.zone == '' ||
      this.permis == '' ||
      this.licence==''
    ) {
      console.log('veuillez remplir tous les champs');
    } else {
      this.registerConducteur.inscription(formData).subscribe(
        (reponse) => {
          console.log(reponse);
          this.viderChamp();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  listeZone() {
    this.lieu.getAllZones().subscribe((zones: any) => {
      this.tabZone = zones;
      console.warn(this.tabZone);
    })
  }

  viderChamp() {
    this.prenom = '';
    this.nom = '';
    this.email = '';
    this.password = '';
    this.zone = '';
    this.profil = '';
    this.passager = '';
    this.conducteur = '';
    this.telephone = '';
  }

}
