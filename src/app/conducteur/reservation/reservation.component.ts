import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';
import { Loading, Notify } from 'notiflix';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  // Déclaration des variables 
  tabReservation: any[] = [];
  tabReservationFinaliser: any[] = [];
  tabRservationFilters: any[] = [];

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  status: string = "";
  secteur: string = "";

  // Déclaration des méthodes 
  constructor(private listeReservation: ReservationService, private accepted: ReservationService, private deleteReservation: ReservationService) { }

  ngOnInit(): void {
    Loading.pulse('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    this.listeRes();
    this.listeResFinaliser();
    this.tabRservationFilters = this.tabReservation;
    Loading.remove();
  }

  // Gestion bouton
  boutonActif = 1;

  // Initialiser le contenu actuel
  currentContent: string = 'reservationEncours';

  // Mettre à jour le contenu actuel
  showComponant(contentId: string): void {
    this.currentContent = contentId;
  }

  //filtre
  onSearch() {
    alert(this.status)
    alert(this.secteur)
    // Recherche se fait selon le depart ou l' arriver 
    this.tabRservationFilters = this.tabReservation.filter(
      (elt: any) => (elt?.etatReservations.toLowerCase()?.includes(this.status.toLowerCase()) 
                    // elt?.LieuArrivee.toLowerCase()?.includes(this.secteur.toLowerCase())
                    )
    );
  }

  listeRes() {
    this.listeReservation.getReservation().subscribe(
      (reservation: any) => {

        this.tabReservation = reservation.filter((reservation: any) => reservation.etatReservations == 0);
      },
      (err) => {

      }
    )
  }

  listeResFinaliser() {
    this.listeReservation.getReservation().subscribe(
      (reservation: any) => {
   
        this.tabReservationFinaliser = reservation.filter((reservation: any) => reservation.etatReservations == 1);
      },
      (err) => {

      }
    )
  }

  // Accepeter reservation
  reservationAccepte(paramReservation: any) {
    Loading.pulse('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    // const addResponse = {
    //   idreservation: paramReservation,
    // }
    this.accepted.reservationAccepted(paramReservation).subscribe(
      (reservation) => {
        Loading.remove();
        this.alertMessage("Response...", reservation.message,1500);
        this.listeRes();
        this.listeResFinaliser();
      },
      (error) => { 

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

          this.alertMessage( "Response...",resp.message,1500);
          this.listeRes();
        },
          (err) => {
            this.alertMessage("Response...", err.error.message,1500);
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
  alertMessage(title: any, text: any,timer:any) {
    Swal.fire({
      title: title,
      text: text,
      timer: timer
    });
  }

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPageF(): any[] {
    if (Array.isArray(this.tabReservationFinaliser)) {
      const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
      const indexFin = indexDebut + this.itemsParPage;
      return this.tabReservationFinaliser.slice(indexDebut, indexFin);
    } else {
      // Gérer le cas où this.tabReservationFinaliser n'est pas un tableau
    
      return []; // ou autre traitement approprié
    }
  }

  // Méthode pour générer la liste des pages
  get pagesF(): number[] {
    const totalPages = Math.ceil(this.tabReservationFinaliser.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPagesF(): number {
    return Math.ceil(this.tabReservationFinaliser.length / this.itemsParPage);
  }

}
