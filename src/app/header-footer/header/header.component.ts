import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { param } from 'jquery';
import { apiUrl } from 'src/app/services/apiUrl';
import { VoitureService } from 'src/app/services/voiture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dbUsers: any;
  role: string = '';
  isChauffeur: boolean = false;
  isClient: boolean = false;
  userConnect: any;
  userConnectCar: any;
  voitureUser: any;
  tabNotifications: any;

  imageVoiture: any;
  nbrPlaces: string = '';
  disponible: string = '';
  description: string = '';

  inputCar: any;
  inputPlace: string = '';
  inputDes: string='';


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
    this.imageVoiture = event.target.files[0] as File;
  }

  getFileUpdate(event: any) {
    console.warn(event.target.files[0]);
    this.inputCar = event.target.files[0] as File;
  }

  // Déclaration des méthodes 
  constructor( private route:Router, private http: HttpClient, private ajoutVoiture:VoitureService, private listeVoiture:VoitureService) { }

  ngOnInit() {
    // Renvoie un tableau de valeurs ou un tableau vide 
    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");
    this.role = this.dbUsers.original.data.utilisateur.role;
    console.log(this.role);


    if (this.dbUsers.original.data.utilisateur.role == "chauffeur") {
      this.isChauffeur = true;
      this.isClient = false;
    } else if (this.dbUsers.original.data.utilisateur.role == "client") { 
      this.isChauffeur = false;
      this.isClient = true;
    }

    console.log(this.dbUsers.original);
    this.userConnect = this.dbUsers.original.data.utilisateur;
    console.log(this.userConnect);

    this.tabNotifications = this.dbUsers.original.data.notification
    console.warn(this.tabNotifications);

    this.listerVoiture()
  }

  addVoiture() {
    let formData = new FormData();
    formData.append("ImageVoitures", this.imageVoiture);
    formData.append("NbrPlaces", this.nbrPlaces);
    formData.append("Descriptions", this.description);
    if (
      this.imageVoiture == '' ||
      this.nbrPlaces == '' ||
      this.description == '' 
    ) {
      this.alertMessage("error", "Ooops...", "veuillez remplir tous les champs");
    } else {
      this.ajoutVoiture.postVoitures(formData).subscribe(
        (reponse) => {
          let message = reponse.message
          console.log(reponse.message);
          this.alertMessage("success", "Good...", message);
          this.imageVoiture = '';
          this.nbrPlaces ='';
          this.description = '';
        },
        (error) => { 
         let  message =error.error.message;
          console.warn(error);
          this.alertMessage("error", "Ooops...", message);

        }
      )
    }
  }

  listerVoiture() {
    this.listeVoiture.getAllVoitures().subscribe((car: any) => {
      this.voitureUser = car;
      console.log(this.voitureUser.data.ImageVoitures);
      this.userConnectCar = this.voitureUser.data;
      console.log(this.userConnectCar.ImageVoitures);
    },
      (err) => {
        console.log(err);
      }
    )
  }

  currentCar: any;
  // Methode pour charger les infos du voiture à modifier
  chargerInfosVoiture(paramCar: any) {
    this.currentCar = paramCar = this.userConnectCar;
    this.inputCar = paramCar.ImageVoitures;
    this.inputPlace = paramCar.NbrPlaces; 
    this.inputDes = paramCar.Descriptions;
  }

  // Methode pour modifier la voiture 
  MAJCar() {
    const image = this.inputCar;
    const places = this.inputPlace;
    const desc = this.inputDes;

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
        try {
          const urlUser = `${apiUrl}/ModifierVoiture/${this.currentCar.id}`;
          alert(urlUser);
          let formData = new FormData();
          formData.append("id", this.currentCar.id,);
          formData.append("ImageVoitures", image);
          formData.append("NbrPlaces", places);
          formData.append("Descriptions", desc);
          await this.http.post(urlUser, formData).toPromise();
          console.log(await this.http.post(urlUser, formData).toPromise());

          this.alertMessage("success", "Bravo", "Modification effectuée avec succès");
        } catch (error) {
          console.log('erreurrrrrrrrrrrrrrrrr'),
          console.error("Erreur lors de la mise à jour :", error);
          this.alertMessage("error", "Erreur", "Une erreur est survenue lors de la modification");
        }
      }
    });
  }

  logout() {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir vous déconnecter ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "Oui, me déconnecter"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userOnline');
        this.route.navigate(['/accueil']);
        Swal.fire({
          title: "Déconnexion!",
          text: "Vous vous etes déconnecté avec succés",
          icon: "success"
        });
      }
    });

  }
}
