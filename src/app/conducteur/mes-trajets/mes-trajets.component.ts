import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { apiUrl } from 'src/app/services/apiUrl';
import { AvisService } from 'src/app/services/avis.service';
import { TrajetService } from 'src/app/services/trajet.service';
import Swal from 'sweetalert2';
import { Loading, Notify } from 'notiflix';

@Component({
  selector: 'app-mes-trajets',
  templateUrl: './mes-trajets.component.html',
  styleUrls: ['./mes-trajets.component.css']
})
export class MesTrajetsComponent {
  // Déclaration des variables 
  tabTrajet: any[] = [];
  tabTrajetFilter: any[] = [];
  dbUsers: any;
  userConnect: any;
  filterValue: string = "";
  error: any;


  // attributs
  depart: string = '';
  arriver: string = '';
  date: string = '';
  time: string = '';
  prix: string = '';
  description: string = '';
  commentaire: string = '';
  
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
  constructor(private http: HttpClient, private listerTrajet: TrajetService, private updateTrajet: TrajetService, private deleteTrajet:TrajetService, private sendAvisService: AvisService) { }

  ngOnInit(): void {
    this.listeTrajet();


    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");

    this.userConnect = this.dbUsers.original.data.utilisateur;
 
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
        this.tabTrajetFilter = this.tabTrajet;
      }
    )
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
      this.verifArriver = "Le lieu d'arriver  ne  doit pas contenir de nombres.";
    }
    else if (this.arriver.length < 4) {
      this.verifArriver = "Le lieu d'arriver ne doit pas etre inferieur a 4 caractères.";
    }
    else if (this.depart.toLowerCase == this.arriver.toLowerCase) {
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
      this.verifPrix = "";
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

  minDate(): string {
    const currentDate = new Date();
    // Formate la date au format ISO (YYYY-MM-DD) pour l'attribut min
    const isoDate = currentDate.toISOString().split('T')[0];
    return isoDate;
  }



  //Méthode pour charger les informations du trajets à modifier
  currentTrajet: any;
  chargerInfosTrajets(paramTrajet: any) {
    this.currentTrajet = paramTrajet;
    this.depart = paramTrajet.LieuDepart;
    this.arriver = paramTrajet.LieuArrivee;
    this.date = paramTrajet.DateDepart;
    this.time = paramTrajet.HeureDepart;
    this.prix = paramTrajet.Prix;
    this.description = paramTrajet.Description;
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
          Loading.pulse('Loading...', {
            backgroundColor: 'rgba(0,0,0,0.8)',
          });
          const urlUser = `${apiUrl}/UpdateTrajet/${this.currentTrajet.id}`;
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
          Notify.success('Modification effectuée avec succès');
          Loading.remove();
          // this.alertMessage("success", "Bravo", "Modification effectuée avec succès");
          this.listeTrajet();
        } catch (error) {
          Notify.failure("Une erreur est survenue lors de la modification");
          Loading.remove();
          // this.alertMessage("error", "Erreur", "Une erreur est survenue lors de la modification");
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
        Loading.pulse('Loading...', {
          backgroundColor: 'rgba(0,0,0,0.8)',
        });
        this.deleteTrajet.deleteTrajet(trajetId).subscribe((resp: any) => {
          Notify.success('Suppression effectuer avec succée');
          // this.alertMessage("success", "Bravo", "Suppression effectuer avec succée");
          this.listeTrajet();
          Loading.remove();
        });
      }
    });

  }

  // detail du passager cliqué
  trajetSelected: any;
  detailClient(paramTrajet: any) {
    this.trajetSelected = this.tabTrajetFilter.find((item: any) => item.id == paramTrajet)

  }

  note : any;
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

  // sweetAlert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }
}
