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

  // Déclaration des méthodes 
  constructor(private http: HttpClient, private ajoutTrajet: TrajetService) { }
  
  // sweetAlert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
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

  addTrajet() {
    let addTrajet = {
      LieuDepart: this.depart,
      LieuArrivee: this.arriver,
      DateDepart: this.date,
      HeureD: this.time,
      Prix: this.prix,
      DescriptionTrajet: this.description,
    }
    alert(this.depart);
    alert(this.arriver);
    alert(this.date);
    alert(this.time);
    alert(this.prix);
    alert(this.description);

    if (
      this.depart == '' ||
      this.arriver == '' ||
      this.date == '' ||
      this.time == '' ||
      this.prix == '' ||
      this.description == ''
    ) {
      this.alertMessage("error", "Ooops...", "veuillez remplir tous les champs");
    } else {
      this.ajoutTrajet.postTrajet(addTrajet).subscribe(
        (reponse) => {
          console.log(reponse);
          this.viderChamp();
          this.alertMessage("success", "Good...", "success");

        },
        (error) => {
          console.log(error);
          this.alertMessage("error", "Ooops...", error.message);
        }
      )
    }
  }

}
