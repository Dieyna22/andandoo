import { Component } from '@angular/core';
import { VoitureService } from 'src/app/services/voiture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css']
})
export class VoituresComponent {
  // Déclaration des variables 
  tabVoitures: any[] = [];
  voitureIndisponible:any[] = [];


  tabVoituresFilter: any[] = [];
  voitureIndisponibleFilter: any[] = [];

  filterValue: string = "";

  mail: string = "";
  message: string = "";

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Gestion bouton
  boutonActif = 1;

  // Initialiser le contenu actuel
  currentContent: string = 'disponibles';

  // Mettre à jour le contenu actuel
  showComponant(contentId: string): void {
    this.currentContent = contentId;
  }

  // Déclaration des méthodes 
  constructor(private listeVoiture: VoitureService) { }

  ngOnInit(): void {
    this.listerVoitureDisponible();
    this.listerVoitureIndisponible();
  }

 
  listerVoitureDisponible() {
    this.listeVoiture.getVoituresDisponibles().subscribe((car: any) => {
      this.tabVoitures = car;
      console.log(this.tabVoitures);
      this.tabVoituresFilter = this.tabVoitures;

    },
      (err) => {
        console.log(err);
      }
    )
  }

  listerVoitureIndisponible() {
    this.listeVoiture.getVoituresNonDisponibles().subscribe((car: any) => {
      this.voitureIndisponible = car;
      console.log(this.voitureIndisponible);
      this.voitureIndisponibleFilter = this.voitureIndisponible;

    },
      (err) => {
        console.log(err);
      }
    )
  }
  
  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le nom ou le prenom 
    this.tabVoituresFilter = this.tabVoitures.filter(
      (elt: any) => (elt?.prenomchauffeur.toLowerCase().includes(this.filterValue.toLowerCase()) || elt?.nomchauffeur.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabVoituresFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabVoituresFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabVoituresFilter.length / this.itemsParPage);
  }

  // sweetAlert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPageIndispo(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.voitureIndisponibleFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pagesIndispo(): number[] {
    const totalPages = Math.ceil(this.voitureIndisponibleFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPagesIndispo(): number {
    return Math.ceil(this.voitureIndisponibleFilter.length / this.itemsParPage);
  }
  // Methode de recherche automatique pour professeur
  onSearchCarIndisponile() {
    // Recherche se fait selon le nom ou le prenom 
    this.voitureIndisponibleFilter = this.voitureIndisponible.filter(
      (elt: any) => (elt?.prenomchauffeur.toLowerCase().includes(this.filterValue.toLowerCase()) || elt?.nomchauffeur.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }

}
