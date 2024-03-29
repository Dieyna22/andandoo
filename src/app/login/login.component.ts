import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ZoneService } from '../services/zone.service';
import { Loading, Notify } from 'notiflix';

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
  isEmailDirty: boolean = false;
  isPasswordDirty: boolean = false;
  fieldDirty: { [key: string]: boolean } = {};
  //inscription
  prenom: string = "";
  nom: string = "";
  email: string = "";
  password: string = "";
  telephone: string = "";
  profil: any;
  zone: string = "";
  conducteur: string = "";
  passager: string = "";
  permis: any;
  licence: any;
  role: string = "";
  CAG: any;
  resetEmail: string = "";
  selectedRole: string = '';

  activite: string = '';
  image: string = '';

  chauffeur: string = "";
  client: string = "";

  users: any;
  showSteps: boolean = true;
  choixFormulaire: boolean = true;


  tabZone: any;
  Router: any;


  constructor(private route: Router, private auth: AuthService, private lieu: ZoneService, private authUser: AuthService, private logout: AuthService, private registerclient: AuthService, private registerConducteur: AuthService, private forget: AuthService, private validationService: AuthService) { }

  ngOnInit() {
    this.listeZone()

    if (!localStorage.getItem("isAdmin")) {
      localStorage.setItem("isAdmin", JSON.stringify(false))
    }

    if (!localStorage.getItem("isUsers")) {
      localStorage.setItem("isUsers", JSON.stringify(false))
    }

    if (!localStorage.getItem("isChauffeur")) {
      localStorage.setItem("isChauffeur", JSON.stringify(false))
    }

    if (!localStorage.getItem("userOnline")) {
      localStorage.setItem("userOnline", JSON.stringify(""))
    }
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
  alertMessage(title: any, text: any, timer: any) {
    Swal.fire({
      title: title,
      text: text,
      timer: timer,
    });
  }

  getFile(event: any) {
    this.profil = event.target.files[0] as File;
  }

  getFilePermmis(event: any) {
    this.permis = event.target.files[0] as File;
  }

  getFileLicence(event: any) {
    this.licence = event.target.files[0] as File;
  }

  getFileCAG(event: any) {
    this.CAG = event.target.files[0] as File;
  }


  // validation automatique des champs

  isEmailValid(): boolean {
    const emailRegex = /^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    return emailRegex.test(this.emailLogin);
  }

  isPasswordValid(): boolean {
    // Vérification de la longueur du mot de passe et l'absence d'espaces
    return this.passwordLogin.length >= 8 && !/\s/.test(this.passwordLogin);
  }

  setEmailDirty() {
    this.isEmailDirty = true;
    if (this.emailLogin == '') {
      this.isEmailDirty = false;
    }
  }

  setPasswordDirty() {
    this.isPasswordDirty = true;
    if (this.passwordLogin == '') {
      this.isPasswordDirty = false;
    }
  }

  isFormValid(): boolean {
    return this.isEmailValid() && this.isPasswordValid();
  }

  tabError: any;
  // connexion 
  connexion() {
    Loading.pulse('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    let user = {
      "email": this.emailLogin,
      "password": this.passwordLogin
    };

    if (this.email == '' && this.passwordLogin == '') {
      this.alertMessage("Reponse...", 'veuillez remplir tous les champs ', 1500);
    }
    else if (this.emailLogin === 'admin@gmail.com' && this.passwordLogin === 'Admin123@') {
      // Connexion en tant qu'admin
      this.auth.connexionAdmin(user).subscribe(
        (response) => {
          Notify.success('connexion reussie');
          this.auth.isAuthenticated = true;
          localStorage.setItem("isAdmin", JSON.stringify(true));
          localStorage.setItem("isUsers", JSON.stringify(false));
          localStorage.setItem("isChauffeur", JSON.stringify(false))
          localStorage.setItem('userOnline', JSON.stringify(response));
          this.route.navigate(['/admin']);
          Loading.remove();
        },
        (err) => {
          // let message = err.error;
          this.alertMessage("Reponse...", err, 1500);
        }
      );
    } else {
      // Connexion en tant qu'utilisateur normal
      this.authUser.connexionUtilisateur(user).subscribe(
        (response) => {
          this.auth.isAuthenticated = true;
          this.tabError = response.errorList;

          if (response.data.statusCode == 200) {
            Notify.success('connexion reussie');
            localStorage.setItem("isAdmin", JSON.stringify(false));
            localStorage.setItem("isChauffeur", JSON.stringify(false));
            localStorage.setItem("isUsers", JSON.stringify(true));
            if (response.data.utilisateur.role == "chauffeur") {
              localStorage.setItem("isChauffeur", JSON.stringify(true));
            }
            localStorage.setItem('userOnline', JSON.stringify(response));
            this.route.navigate(['/accueilUtilisateur']);
            Loading.remove();
          } else {
            Loading.remove();
          }
        },
        (err) => {
          let message = err.error.error;
          Notify.failure(message);
          Loading.remove();
        }
      );
    }
  }

  // Validation des champs au saisi
  isFieldDirty(fieldName: string): boolean {
    return this.fieldDirty[fieldName] || false;
  }

  setFieldDirty(fieldName: string): void {
    this.fieldDirty[fieldName] = true;
  }

  isFieldValid(fieldName: string): boolean {
    switch (fieldName) {
      case 'prenom':
        return this.prenom.trim().length >= 2;
      case 'nom':
        return this.nom.trim().length >= 2;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(this.email);
      case 'password':
        return this.password.length >= 8 && !/\s/.test(this.password);
      case 'profil':
        return this.zone.trim().length > 0;
      case 'tel':
        const validPrefixes = ['77', '78', '75', '76', '70'];
        const isValidPrefix = validPrefixes.some((prefix) =>
          this.telephone.trim().startsWith(prefix)
        );
        return /^\d{9}$/.test(this.telephone.trim()) && isValidPrefix;

      default:
        return true;
    }
  }

  isFormValided(): boolean {
    return Object.keys(this.fieldDirty).every((fieldName) =>
      this.isFieldValid(fieldName)
    );
  }

  // fin validation
  recup: any;
  recupId: any;
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


    this.registerclient.inscription(formData).subscribe(
      (reponse) => {
        this.recup = reponse.user;
        this.recupId = this.recup.id;
        this.envoieValidation();
        // this.choixFormulaire = !this.choixFormulaire;
        this.viderChamp();
        this.tabError = reponse.errorList;
        // this.alertMessage("Reponse...","success");
      },
      (error) => {

      }
    )

  }

  //methode d'envoie code de validation
  envoieValidation() {
    this.validationService.CodeValidation(this.recupId).subscribe(
      (response) => {
      },
      (error) => {
      }
    )
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
    formData.append("CarteGrise", this.CAG);

    if (
      this.nom == '' ||
      this.prenom == '' ||
      this.telephone == '' ||
      this.email == '' ||
      this.password == '' ||
      this.zone == '' ||
      this.permis == '' ||
      this.licence == ''
    ) {
      this.alertMessage('Response...', 'veuillez remplir tous les champs', 1500)
    } else {
      this.registerConducteur.inscription(formData).subscribe(
        (reponse) => {
          this.alertMessage('Response...', reponse.message, 1500)
          this.viderChamp();
          this.choixFormulaire = !this.choixFormulaire;
        },
        (error) => {
          this.alertMessage('Response...', error.error.message, 1500)
        }
      )
    }
  }

  //reset password
  forgetPassword() {
    const reset = {
      "email": this.resetEmail
    }
    this.forget.forgetPass(reset).subscribe(
      (reponse) => {
        this.alertMessage("response...", reponse.message, 1500);
        this.resetEmail = '';
      },
      (err) => {
        this.alertMessage("response...", err.message, 1500);
      }
    )
  }





  //listes des zones
  listeZone() {
    this.lieu.getAllZones().subscribe((zones: any) => {
      this.tabZone = zones;
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
    this.licence = '';
    this.permis = '';
    this.CAG = '';
  }

  suivant() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    const telephonePattern = /^(77|78|70|75)[0-9]{7}$/;
    if (
      this.nom == '' ||
      this.prenom == '' ||
      this.telephone == '' ||
      this.email == '' ||
      this.password == '' ||
      this.zone == '' ||
      this.permis == '' ||
      this.licence == ''
    ) {
      Swal.fire({
        title: "Ooops....!",
        text: "veuillez remplir tous les champs",
        icon: "error"
      });
    }
    //  else if (!this.email.match(emailPattern)) {
    //   Swal.fire({
    //     title: "Atention....!",
    //     text: "Veillez revoir votre email",
    //     icon: "warning"
    //   });
    // } else if (!this.telephone.match(telephonePattern)) {
    //   Swal.fire({
    //     title: "Atention....!",
    //     text: "Veillez revoir votre email",
    //     icon: "warning"
    //   });
    // }
    // else if (this.password.length < 8) {
    //   Swal.fire({
    //     title: "Atention....!",
    //     text: "Le mot de passe doit contenir plus de huit caractéres",
    //     icon: "warning"
    //   });
    // }
    else {
      this.showSteps = !this.showSteps;
    }
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}
