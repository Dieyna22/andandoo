import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  // Déclaration des variables 
  tabReservation: any[] = [];
  tabRservationFilters: any[] = [];

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  status: string = "";
  secteur: string = "";

  // Déclaration des méthodes 
  constructor(private listeReservation: ReservationService, private accepted: ReservationService, private deleteReservation: ReservationService) { }

  ngOnInit(): void {
    this.listeRes();
    this.tabRservationFilters = this.tabReservation;
  }

  //filtre
  onSearch() {
    alert(this.status)
    alert(this.secteur)
    // Recherche se fait selon le depart ou l' arriver 
    this.tabRservationFilters = this.tabReservation.filter(
      (elt: any) => (elt?.Nom.toLowerCase()?.includes(this.status.toLowerCase()) ||
                    elt?.LieuArrivee.toLowerCase()?.includes(this.secteur.toLowerCase())
                    )
    );
  }

  listeRes() {
    this.listeReservation.getReservation().subscribe(
      (reservation: any) => {
        console.log(reservation);
        this.tabReservation = reservation;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  // Accepeter reservation
  reservationAccepte(paramReservation: any) {
    alert(paramReservation);
    const addResponse = {
      idreservation: paramReservation,
    }
    this.accepted.reservationAccepted(paramReservation).subscribe(
      (reservation) => {
        console.log(reservation);
      },
      (error) => { 
        console.log(error);
      }
    )
    
  }

  //Annuler reservation
  supprimerReservation(reservationId: any) {
    Swal.fire({
      title: "Etes vous sur",
      text: "voulez vous Annuler!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "OUI !!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteReservation.reservationAnnuler(reservationId).subscribe((resp: any) => {
          console.log(resp.error.message)
          this.alertMessage( "Response...",resp.message);
          this.listeRes();
        },
          (err) => {
            this.alertMessage("Response...", err.error.message);
          }
        );
      }
    });

  }


  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    if (Array.isArray(this.tabReservation)) {
      const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
      const indexFin = indexDebut + this.itemsParPage;
      return this.tabReservation.slice(indexDebut, indexFin);
    } else {
      // Gérer le cas où this.tabReservation n'est pas un tableau
      console.error("this.tabReservation n'est pas un tableau.");
      return []; // ou autre traitement approprié
    }
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabReservation.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabReservation.length / this.itemsParPage);
  }

  // sweetAlert
  alertMessage(title: any, text: any) {
    Swal.fire({
      title: title,
      text: text
    });
  }
}
