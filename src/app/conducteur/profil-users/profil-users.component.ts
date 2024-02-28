import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { apiUrl } from 'src/app/services/apiUrl';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-users',
  templateUrl: './profil-users.component.html',
  styleUrls: ['./profil-users.component.css']
})
export class ProfilUsersComponent  {
  dbUsers: any;
  userConnect: any;

  isChauffeur: boolean = false;
  isClient: boolean = false;

  prenom: string = '';
  nom: string = '';
  tel: string = '';
  profil: any;
  permis: any;
  licence: any;
  CAG: any;

  constructor(private http: HttpClient, private updateService:UtilisateurService){}

  ngOnInit() {
    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");
    console.log(this.dbUsers.original);
    this.userConnect = this.dbUsers.original.data.utilisateur;
    console.log(this.userConnect);

    if (this.dbUsers.original.data.utilisateur.role == "chauffeur") {
      this.isChauffeur = true;
      this.isClient = false;
    } else if (this.dbUsers.original.data.utilisateur.role == "client") {
      this.isChauffeur = false;
      this.isClient = true;
    }
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.profil = event.target.files[0] as File;
  }

  getFilePermmis(event: any) {
    console.warn(event.target.files[0]);
    this.permis = event.target.files[0] as File;
  }

  getFileLicence(event: any) {
    console.warn(event.target.files[0]);
    this.licence = event.target.files[0] as File;
  }

  getFileCAG(event: any) {
    console.warn(event.target.files[0]);
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
    // const profil = {
    //   'Prenom': this.prenom,
    //   'Telephone': this.tel,
    //   'Nom': this.nom,
    // }
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
        const urlUser = `${apiUrl}/Update/Profile/${this.userConnect.id}`;
        alert(urlUser);
        await this.http.post(urlUser, formData).toPromise();
        console.log(this.http.post(urlUser, formData).toPromise());

        this.alertMessage("success", "Bravo", "Modification effectuée avec succès");
      }
    });
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
