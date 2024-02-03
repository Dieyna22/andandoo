import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { apiUrl } from 'src/app/services/apiUrl';
import { AvisService } from 'src/app/services/avis.service';
import { TrajetService } from 'src/app/services/trajet.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historiques-en-cours',
  templateUrl: './historiques-en-cours.component.html',
  styleUrls: ['./historiques-en-cours.component.css']
})
export class HistoriquesEnCoursComponent {
  // Déclaration des variables 
  tabTrajet: any[] = [];
  tabTrajetFilter: any[] = [];
  dbUsers: any;
  userConnect: any;
  filterValue: string = "";

  // attributs
  depart: string = '';
  arriver: string = '';
  date: string = '';
  time: string = '';
  prix: string = '';
  description: string = '';
  commentaire: string = '';


  // Déclaration des méthodes 
  constructor(private http: HttpClient, private listerTrajet: TrajetService, private updateTrajet: TrajetService, private deleteTrajet: TrajetService, private sendAvisService: AvisService) { }

  ngOnInit(): void {
    this.listeTrajet();

    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");
    console.log(this.dbUsers.original);
    this.userConnect = this.dbUsers.original.data.utilisateur;
    console.log(this.userConnect);
  }


  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le depart ou l' arriver 
    this.tabTrajetFilter = this.tabTrajet.filter(
      (elt: any) => (elt?.LieuDepart.toLowerCase().includes(this.filterValue.toLowerCase()) || elt?.LieuArrivee.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

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
    this.listerTrajet.getMesTrajets().subscribe(
      (trajet: any) => {
        this.tabTrajet = trajet;
        console.error(this.tabTrajet);
        this.tabTrajetFilter = this.tabTrajet;
        console.log(this.tabTrajetFilter)
      },
      (err) => {
        console.log(err);
      }
    )
  }

  //Méthode pour charger les informations du trajets à modifier
  currentTrajet: any;
  chargerInfosTrajets(paramTrajet: any) {
    this.currentTrajet = paramTrajet;
    this.depart = paramTrajet.LieuDepart;
    this.arriver = paramTrajet.LieuArrivee;
    this.date = paramTrajet.DeateDepart;
    this.time = paramTrajet.HeureDepart;
    this.prix = paramTrajet.Prix;
    this.description = paramTrajet.Description;
    console.log(paramTrajet);
  }

  // Methode pour modifier un trajet 
  MAJTrajet() {
    const lDepart = this.depart;
    const lArriver = this.arriver;
    const date = this.date;
    const time = this.time;
    const prix = this.prix;
    const desc = this.description;

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
          const urlUser = `${apiUrl}/UpdateTrajet/${this.currentTrajet.id}`;
          alert(urlUser);
          const putData = {
            id: this.currentTrajet.id,
            LieuDepart: lDepart,
            LieuArrivee: lArriver,
            DateDepart: date,
            HeureD: time,
            Prix: prix,
            DescriptionTrajet: desc,
          }
          await this.http.post(urlUser, putData).toPromise();
          console.log(this.http.post(urlUser, putData).toPromise());

          this.alertMessage("success", "Bravo", "Modification effectuée avec succès");
          this.listeTrajet();
        } catch (error) {
          console.error("Erreur lors de la mise à jour :", error);
          this.alertMessage("error", "Erreur", "Une erreur est survenue lors de la modification");
        }
      }
    });
  }

  // Methode pour supprimer un trajet 
  supprimerTrajet(trajetId: any) {
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
        this.deleteTrajet.deleteTrajet(trajetId).subscribe((resp: any) => {
          console.log(resp)
          this.alertMessage("success", "Bravo", "Suppression effectuer avec succée");
          this.listeTrajet();
        });
      }
    });

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

  // sweetAlert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }
}
