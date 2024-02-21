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
    this.listeTrajet();
    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");
    console.log(this.dbUsers.original);
    this.userConnect = this.dbUsers.original.data.utilisateur;
    console.log(this.userConnect);
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
        console.log(this.showDate);
        console.log(this.tabTrajet);
        this.tabTrajetFilter = this.tabTrajet.filter((trajet: any) => trajet.ChauffeurId != this.userConnect.id && trajet.Status == 'enCours');
        console.log(this.tabTrajetFilter);

        // trajet.ChauffeurId != userConnect.id && trajet.Status == 'enCours'
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

  id_trajet: any;
  recupId(paramTrajet:any) {
    this.id_trajet = paramTrajet.id;
    console.log(this.id_trajet);
  }

  envoyerAvis() {
    const avis = {
      Contenue: this.commentaire,
      Notation: this.note,
    };
    this.sendAvisService.sendAvis(avis,this.id_trajet).subscribe(
      (reponse) => {
        console.log(reponse);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  demandeEnCours=0;
  // Demande de reservation
  demandeRservation() {
    alert(this.id_trajet);
    const addReservation = {
      trajet_id: this.id_trajet,
      NombrePlaces:this.nbrplace,
    }
    this.reservation.postReservation(addReservation).subscribe(
      (reponse) => {
        console.log(reponse);
        this.alertMessage("Response...", reponse.message);
        this.demandeEnCours = 1;
      },
      (error) => { 
        console.log(error);
        this.alertMessage("Response...", error.error.message);
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
}
