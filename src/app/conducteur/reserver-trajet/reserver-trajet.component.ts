  import { Component } from '@angular/core';
import { AvisService } from 'src/app/services/avis.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TrajetService } from 'src/app/services/trajet.service';
import Swal from 'sweetalert2';
import { Loading, Notify } from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

@Component({
  selector: 'app-reserver-trajet',
  templateUrl: './reserver-trajet.component.html',
  styleUrls: ['./reserver-trajet.component.css']
})
export class ReserverTrajetComponent {
  // Déclaration des variables 
  tabTrajet: any[] = [];
  tabTrajetFilter: any[] = [];

  tabAllTrajet: any[] = [];
  tabAllTrajetFilter: any[] = [];

  dbUsers: any;
  userConnect: any;


  commentaire: string = '';
  depart: string = '';
  arriver: string = '';
  date: string = '';
  time: string = '';
  nbrplace:string = '';
 
  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Déclaration des méthodes 
  constructor(private listerTrajet: TrajetService, private deleteTrajet: TrajetService, private sendAvisService: AvisService, private reservation:ReservationService) { }
 
  ngOnInit(): void {
    Loading.pulse('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    this.listeTrajet();
    this.listeAllTrajet();
    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");
    this.userConnect = this.dbUsers.data.utilisateur;
    Loading.remove();
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

  showDate: any;
  listeTrajet() {
    this.listerTrajet.getAllTrajets().subscribe(
      (trajet: any) => {
        this.tabTrajet = trajet;
        this.showDate = trajet.DateDepart;
        console.log(trajet);
        this.tabTrajetFilter = this.tabTrajet.filter((trajet: any) => trajet.ChauffeurId != this.userConnect.id && trajet.Status == 'enCours' && trajet.NombrePlaceDisponible >= 0);
      },
      (err) => {
        Notify.failure(err);
      }
    )
  }

  listeAllTrajet() {
    this.listerTrajet.getAllTrajets().subscribe(
      (trajet: any) => {
        this.tabAllTrajet = trajet;
        this.showDate = trajet.DateDepart;
        this.tabAllTrajetFilter = this.tabAllTrajet.filter((trajet: any) => trajet.Status == 'enCours' && trajet.NombrePlaceDisponible >= 0);
      },
      (err) => {
        Notify.failure(err);
      }
    )
  }

  // detail du passager cliqué
  trajetSelected: any;
  detailClient(paramTrajet: any) {
    this.trajetSelected = this.tabTrajetFilter.find((item: any) => item.id == paramTrajet)
  }

  detailTrajet(paramTrajet: any) {
    this.trajetSelected = this.tabAllTrajetFilter.find((item: any) => item.id == paramTrajet)
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

  id_trajet: any;
  recupId(paramTrajet: any) {
    this.id_trajet = paramTrajet;
  }

  envoyerAvis() {
    const avis = {
      Contenue: this.commentaire,
      Notation: this.note,
    };
    this.sendAvisService.sendAvis(avis,this.id_trajet).subscribe(
      (reponse) => {
        console.log(reponse);
        Notify.success('envoyer avec succee');
        this.commentaire = '';
        this.note = '';
      },
      (err) => {
        Notify.failure(err);
        this.commentaire = '';
        this.note = '';
      }
    )
  }

  demandeEnCours=0;
  // Demande de reservation
  demandeRservation() {
    const addReservation = {
      trajet_id: this.id_trajet,
      NombrePlaces:this.nbrplace,
    }
    this.reservation.postReservation(addReservation).subscribe(
      (reponse) => {
        Report.success(
          'Notiflix Success',
          reponse.message,
          'Okay',

        );
        this.demandeEnCours = 1;
        this.nbrplace = '';
      },
      (error) => { 
        Report.failure(
          'Notiflix failure',
          error.error.message,
          'Okay',
        );
        this.nbrplace = '';
        this.demandeEnCours = 0;
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

  onSearch() {
    this.tabTrajetFilter = this.tabTrajet.filter(
      (elt: any) => (elt?.LieuDepart.toLowerCase().includes(this.depart.toLowerCase()) &&
                      elt?.LieuArrivee.toLowerCase().includes(this.arriver.toLowerCase()) &&
                      elt?.DateDepart.toLowerCase().includes(this.date.toLowerCase())
                    )
    );
  }

  formatDate(dateString: string): string {
    const selectedDate = new Date(dateString);
    const today = new Date();

    // Vérifier si la date est passée
    if (selectedDate < today) {
      return 'Passée';
    }

    // Calcul de la différence en jours
    const timeDifference = selectedDate.getTime() - today.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    // Affichage de la date relative
    if (daysDifference === 0) {
      return 'Aujourd\'hui';
    } else if (daysDifference === 1) {
      return 'Demain';
    } else if (daysDifference === 2) {
      const options = { weekday: 'long' as const, month: 'long' as const, day: 'numeric' as const };
      const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(selectedDate);
      return formattedDate;
    } else {
      const options = { weekday: 'long' as const, month: 'long' as const, day: 'numeric' as const };
      const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(selectedDate);
      return formattedDate;
    }
  }

  formatHeure(heureString: string): string {
    return heureString.slice(0, 5);
  }

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsAllPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabAllTrajetFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pagesAll(): number[] {
    const totalPages = Math.ceil(this.tabAllTrajetFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPagesAll(): number {
    return Math.ceil(this.tabAllTrajetFilter.length / this.itemsParPage);
  }
}
