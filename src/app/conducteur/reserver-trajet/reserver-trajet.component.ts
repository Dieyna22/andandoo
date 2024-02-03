import { Component } from '@angular/core';
import { AvisService } from 'src/app/services/avis.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TrajetService } from 'src/app/services/trajet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserver-trajet',
  templateUrl: './reserver-trajet.component.html',
  styleUrls: ['./reserver-trajet.component.css']
})
export class ReserverTrajetComponent {
  // Déclaration des variables 
  tabTrajet: any[] = [];
  tabTrajetFilter: any[] = [];

  dbUsers: any;
  userConnect: any;

  commentaire: string = '';
 
  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Déclaration des méthodes 
  constructor(private listerTrajet: TrajetService, private deleteTrajet: TrajetService, private sendAvisService: AvisService, private reservation:ReservationService) { }
 
  ngOnInit(): void {
    this.listeTrajet();
    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");
    console.log(this.dbUsers.original);
    this.userConnect = this.dbUsers.original.data.utilisateur;
    console.error(this.userConnect);
  }

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabTrajetFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabTrajetFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabTrajetFilter.length / this.itemsParPage);
  }

  listeTrajet() {
    this.listerTrajet.getAllTrajets().subscribe(
      (trajet: any) => {
        this.tabTrajet = trajet;
        console.log(this.tabTrajet);
        this.tabTrajetFilter = this.tabTrajet;
        console.log('$$$$$$$$$$$$$$$$$$$$$$$',this.tabTrajetFilter)
      },
      (err) => {
        console.log(err);
      }
    )
  }

  // detail du passager cliqué
  trajetSelected: any;
  detailClient(paramTrajet: any) {
    this.trajetSelected = this.tabTrajetFilter.find((item: any) => item.id == paramTrajet)
    console.log(this.trajetSelected);
  }

  note: any;
  // gestion de note avec étoile
  noteStar(note: number) {
    let stars = document.querySelectorAll('#star');
    stars.forEach((element: any) => {

      element.classList.remove("bi-star-fill");
      element.classList.add("bi-star");
    });
    for (let i = 0; i < note; i++) {
      stars[i].classList.remove("bi-star");
      stars[i].classList.add("bi-star-fill");
    }
    this.note = note;
  }

  envoyerAvis() {
    const avis = {
      Contenue: this.commentaire,
      Notation: this.note,
    };
    this.sendAvisService.sendAvis(avis).subscribe(
      (reponse) => {
        console.log(reponse);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  // Demande de reservation
  demandeRservation(paramReservation: any) {
    alert(paramReservation);
    const addReservation = {
      trajet_id: paramReservation,
      NombrePlaces:1,
    }
    this.reservation.postReservation(addReservation).subscribe(
      (reponse) => {
        console.log(reponse);
        this.alertMessage("Response...", reponse.message);
      },
      (error) => { 
        console.log(error);
      }
    )
  }

 
  // sweetAlert
  alertMessage(title: any, text: any) {
    Swal.fire({
      title: title,
      text: text
    });
  }

}
