import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TrajetService } from 'src/app/services/trajet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publier-trajet',
  templateUrl: './publier-trajet.component.html',
  styleUrls: ['./publier-trajet.component.css']
})
export class PublierTrajetComponent {
  // attributs
  depart: string = '';
  arriver: string = '';
  date: string = '';
  time: string = '';
  prix: string = '';
  description: string = '';

  // Variables pour faire la vérifications
  verifDepart: String = "";
  verifArriver: String = "";
  verifDate: String = "";
  verifTime: String = "";
  verifPrix: String = "";

  // Variables si les champs sont exacts
  exactDepart: boolean = false;
  exactArriver: boolean = false;
  exactDate: boolean = false;
  exactTime: boolean = false;
  exactPrix: boolean = false;

  // Déclaration des méthodes 
  constructor(private http: HttpClient, private ajoutTrajet: TrajetService) { }
  
  // sweetAlert
  alertMessage(title: any, text: any) {
    Swal.fire({
      title: title,
      text: text
    });
  }

  viderChamp() {
    this.depart = '';
    this.arriver = '';
    this.date = '';
    this.time = '';
    this.prix = '';
    this.description = '';
  }

  // Verification du lieu de depart
  verifDepartFonction() {
    this.exactDepart = false;
    const expressionReguliere = /^[a-zA-Z]+$/;
    if (this.depart == "") {
      this.verifDepart = "";
      // this.verifDepart = "Le lieu de départ est obligatoire.";
    }
    else if (!expressionReguliere.test(this.depart)) {
      this.verifDepart = "Le lieu de départ ne  doit pas contenir de nombres.";
    }
    else if (this.depart.length < 4) {
      this.verifDepart = "Le lieu de départ ne doit pas etre inferieur a 4 caractères.";
    } 
    else {
      this.verifDepart = "";
      this.exactDepart = true;
    }
  }

  // Verification du lieu d'arriver
  verifArriverFonction() {
    this.exactArriver = false;
    const expressionReguliere = /^[a-zA-Z]+$/;
    if (this.arriver == "") {
      this.verifArriver = "";
      // this.verifArriver = "Le lieu d'arriver est obligatoire.";
    }
    else if (!expressionReguliere.test(this.arriver)) {
      this.verifDepart = "Le lieu d'arriver  ne  doit pas contenir de nombres.";
    }
    else if (this.arriver.length < 4) {
      this.verifArriver = "Le lieu d'arriver ne doit pas etre inferieur a 4 caractères.";
    }
    else if (this.depart == this.arriver) {
      this.verifArriver = "Le lieu d\'arrivée ne doit pas etre le même que le lieu de depart";
    }
    else {
      this.verifArriver = "";
      this.exactArriver = true;
    }
  }

  // Verification de la date
  verifDateFonction() {
    this.exactDate = false;
    if (this.date == "") {
      this.verifDate = "";
      // this.verifDate = "La date de départ est obligatoire";
    }
    else {
      this.verifDate = "";
      this.exactDate = true;
    }
  }


  // Verification de l'heure
  // verifHeureFonction() {
  //   this.exactTime = false;
  //   if (this.time == "") {
  //     this.verifTime = "";
  //     // this.verifTime = "L'heure de départ est obligatoire";
  //   }
  //   else {
  //     this.verifTime = "";
  //     this.exactTime = true;
  //   }
  // }
  
  verifHeureFonction() {
    const now = new Date();
    const selectedDateTime = new Date(`${this.date}T${this.time}`);

    // Ajoute une marge de 20 minutes à l'heure actuelle
    now.setMinutes(now.getMinutes() + 20);

    // Vérifiez si la date sélectionnée est aujourd'hui et si l'heure sélectionnée est antérieure à l'heure actuelle plus 20 minutes
    if (selectedDateTime.toDateString() === now.toDateString() && selectedDateTime <= now) {
      this.error = { HeureD: "Veuillez choisir une heure valide (au moins 20 minutes après l'heure actuelle)." };
      this.exactTime = false;

      // Réinitialise la valeur du champ de temps pour la rendre vide
      this.time = '';
    } else {
      this.error = null;
      this.exactTime = true;
    }
  }


  // Verification du prix
  verifPrixFonction() {
    this.exactPrix = false;
    if (this.prix == null) {
      this.verifPrix ="";
      // this.verifPrix= "Le prix est obligatoire.";
    }
    else if (this.prix < '100') {
      this.verifPrix = "Le prix du trajet ne peut pas être inferieur a 100.";
    }
    else {
      this.verifPrix = "";
      this.exactPrix = true;
    }
  }


  error: any;
  addTrajet() {
    let addTrajet = {
      LieuDepart: this.depart,
      LieuArrivee: this.arriver,
      DateDepart: this.date,
      HeureD: this.time,
      Prix: this.prix,
      DescriptionTrajet: this.description,
    }
    // if (
    //   this.depart == '' ||
    //   this.arriver == '' ||
    //   this.date == '' ||
    //   this.time == '' ||
    //   this.prix == '' 
    // ) {
    //   this.alertMessage("Response...", "veuillez remplir tous les champs");
    // } else {
      this.ajoutTrajet.postTrajet(addTrajet).subscribe(
        (reponse) => {
          console.log(reponse);
          this.viderChamp();
          this.error = reponse.errorList;         

        },
        (error) => {
          console.log(error);
          this.alertMessage("Response...", error.message);
        }
      )
  //   }
  }

  minDate(): string {
    const currentDate = new Date();
    // Formate la date au format ISO (YYYY-MM-DD) pour l'attribut min
    const isoDate = currentDate.toISOString().split('T')[0];
    return isoDate;
  }
}
