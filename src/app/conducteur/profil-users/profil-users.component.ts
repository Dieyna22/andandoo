import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { apiUrl } from 'src/app/services/apiUrl';
import { AuthService } from 'src/app/services/auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-users',
  templateUrl: './profil-users.component.html',
  styleUrls: ['./profil-users.component.css']
})
export class ProfilUsersComponent {
  dbUsers: any;
  userConnect: any;
  userOnlineStr: any;
  userToken: any;

  isChauffeur: boolean = false;
  isClient: boolean = false;

  prenom: string = '';
  nom: string = '';
  tel: string = '';
  profil: any;
  permis: any;
  licence: any;
  CAG: any;

  constructor(private http: HttpClient, private updateService: UtilisateurService, private refresh: AuthService, private profilService: UtilisateurService) { }

  ngOnInit() {
    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");
  
    // this.userConnect = this.dbUsers.original.data.utilisateur;

    this.userToken = this.dbUsers.data.access_token;

    if (this.dbUsers.data.utilisateur.role == "chauffeur") {
      this.isChauffeur = true;
      this.isClient = false;
    } else if (this.dbUsers.data.utilisateur.role == "client") {
      this.isChauffeur = false;
      this.isClient = true;
    }
    this.infos();

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

  //Méthode pour charger les informations du trajets à modifier
  chargerInfosUsers() {
    this.prenom = this.userConnect.Prenom;
    this.nom = this.userConnect.Nom;
    this.tel = this.userConnect.Telephone;

  }

  updateProfil() {
    let formData = new FormData();
    formData.append("Nom", this.nom);
    formData.append("Prenom", this.prenom);
    formData.append("Telephone", this.tel);
    formData.append("ImageProfile", this.profil);
    formData.append("PermisConduire", this.permis);
    formData.append("Licence", this.licence);
    formData.append("CarteGrise", this.CAG);
    Swal.fire({
      title: "Etes vous sur",
      text: "voulez vous modifier!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "OUI !!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.updateService.updateUser(this.userConnect.id, formData).subscribe(
          (reponse) => {
            this.infos();
            this.nom = '';
            this.prenom = '';
            this.tel = '';
            this.profil = '';
            this.permis = '';
            this.licence = '';
            this.CAG = '';
            
          },
          (err) => {
  
          }
        )

        // const urlUser = `${apiUrl}/Update/Profile/${this.userConnect.id}`;
   
        // await this.http.post(urlUser, formData).toPromise();
     

        // this.alertMessage("success", "Bravo", "Modification effectuée avec succès");
        // this.tokenRefresh();
        // localStorage.setItem('userOnline', JSON.stringify(this.http.post(urlUser, formData).toPromise()));
      }
    });

  }

  //méthode pour refresh token
  tokenRefresh() {
    alert(this.userToken)
    const token = {
      "access_token": this.userToken
    }
    this.refresh.refreshToken(token).subscribe(
      (reponse) => {
        this.alertMessage("response...", reponse.message, 1500);
        localStorage.setItem('userOnline', JSON.stringify(reponse));
      },
      (err) => {
        this.alertMessage("response...", err, 1500);
      }
    )
  }

  //liste les informations de l'utilisateur qui se c'est connecter
  infos() {
    this.profilService.profilUser().subscribe(
      (reponse) => {

        this.userConnect = reponse;
      }
    )
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
