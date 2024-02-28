import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  typeCar: any;

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
  constructor( private route:Router, private http: HttpClient, private ajoutVoiture:VoitureService, private listeVoiture:VoitureService ,private deleteVoiture:VoitureService) { }

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

  isValidFileType(fileInput: any): boolean {
    // Ajoutez la logique pour vérifier le type de fichier ici
    // Par exemple, vérifiez l'extension du fichier
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileName = fileInput?.name || '';
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
    return allowedExtensions.includes(fileExtension);
  }

  isFormAddValid(): boolean {
    return this.imageVoiture && this.isValidFileType(this.imageVoiture) &&
      this.nbrPlaces !== null && this.isPositiveNumber(this.nbrPlaces) &&
      // Ajoutez d'autres validations au besoin
      true; 
  }

  error: any;
  addVoiture() {
    let formData = new FormData();
    formData.append("ImageVoitures", this.inputCar);
    formData.append("NbrPlaces", this.inputPlace);
    formData.append("Descriptions", this.inputDes);
    formData.append("type", this.typeCar);
    // if (
    //   this.imageVoiture == '' ||
    //   this.nbrPlaces == '' ||
    //   this.description == '' 
    // ) {
    //   this.alertMessage("error", "Ooops...", "veuillez remplir tous les champs");
    // } else {
      this.ajoutVoiture.postVoitures(formData).subscribe(
        (reponse) => {
          console.log(reponse);
          this.error = reponse.errorList;
          this.imageVoiture = '';
          this.nbrPlaces ='';
          this.description = '';
          this.alertMessage("succes", "Ooops...", reponse.message);
        },
        (error) => { 
         let  message =error.error.message;
          console.warn(error);

        }
      )
    // }
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

  isNumber(value: string): boolean {
    // Ajoutez la logique pour vérifier si la valeur est un nombre
    return !isNaN(Number(value));
  }
  isPositiveNumber(value: string): boolean {
    // Ajoutez la logique pour vérifier si la valeur est un nombre positif
    const numericValue = Number(value);
    return !isNaN(numericValue) && numericValue > 0;
  }
  isFormValid(): boolean {
    return this.isPositiveNumber(this.inputPlace)   
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
          formData.append("type", this.typeCar);
          console.log(await this.http.post(urlUser, formData).toPromise());
        } catch (error) {
          console.log('erreurrrrrrrrrrrrrrrrr'),
          console.error("Erreur lors de la mise à jour :", error);
          this.alertMessage("error", "Erreur", "Une erreur est survenue lors de la modification");
        }
      }
    });
  }

  supprimerCar() {
    Swal.fire({
      title: "Etes vous sur",
      text: "voulez vous supprimer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "OUI !!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteVoiture.deleteVoitures().subscribe((resp: any) => {
          console.log(resp)
          this.alertMessage("success", "Bravo", resp);
        },
          (err) => {
            this.alertMessage("error", "Bravo", err.error.message);
          }
        );
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
        localStorage.setItem("isAdmin", JSON.stringify(false));
        localStorage.setItem("isUsers", JSON.stringify(false));
        localStorage.setItem("isChauffeur", JSON.stringify(false));
        this.route.navigate(['/accueil']);
      }
    });

  }
}
