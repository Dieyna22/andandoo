import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-newsletters',
  templateUrl: './gestion-newsletters.component.html',
  styleUrls: ['./gestion-newsletters.component.css']
})
export class GestionNewslettersComponent implements OnInit {
  // Déclaration des variables 
  tabUsers = [
    {
      nom: "Diouf",
      prenom: "Astou",
      email: "ayou@gmail.com",
      telephone: "770917628",
    },
    {
      nom: "Ndiaye",
      prenom: "Amy",
      email: "test@gmail.com",
      telephone: "770917628",
    },
    {
      nom: "sidy",
      prenom: "pape",
      email: "fun@gmail.com",
      telephone: "770917628",
    },
    {
      nom: "diagne",
      prenom: "Marie",
      email: "bg@gmail.com",
      telephone: "770917628",
    },
    {
      nom: "anta",
      prenom: "Mame",
      email: "test@gmail.com",
      telephone: "770917628",
    },
    {
      nom: "diop",
      prenom: "Alioune",
      email: "fun@gmail.com",
      telephone: "770917628",
    },
    {
      nom: "diaw",
      prenom: "Rokhaya",
      email: "bg@gmail.com",
      telephone: "770917628",
    },
    {
      nom: "ndoye",
      prenom: "Libasse",
      email: "test@gmail.com",
      telephone: "770917628",
    },
    {
      nom: "Ba",
      prenom: "Khady",
      email: "dija@gmail.com",
      telephone: "770917628",
    },
  ];

  tabReaseauFilter: any;

  filterValue: string = "";


  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Déclaration des méthodes 
  constructor() { }

  ngOnInit(): void {
    this.tabReaseauFilter = this.tabUsers;
  }

  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le nom ou le prenom 
    this.tabReaseauFilter = this.tabUsers.filter(
      (elt: any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }


  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabReaseauFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabReaseauFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabReaseauFilter.length / this.itemsParPage);
  }
}
