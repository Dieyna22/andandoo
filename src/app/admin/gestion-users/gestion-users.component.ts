import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit  {
  // Déclaration des variables 
  tabUsers = [
    {
      nom: "Diouf",
      prenom:"Astou",
      email: "ayou@gmail.com",
    },
    {
      nom: "Ndiaye",
      prenom: "Amy",
      email: "test@gmail.com",
    },
    {
      nom: "sidy",
      prenom: "pape",
      email: "fun@gmail.com",
    },
    {
      nom: "diagne",
      prenom: "Marie",
      email: "bg@gmail.com",
    },
    {
      nom: "anta",
      prenom:"Mame",
      email: "test@gmail.com",
    },
    {
      nom: "diop",
      prenom: "Alioune",
      email: "fun@gmail.com",
    },
    {
      nom: "diaw",
      prenom: "Rokhaya",
      email: "bg@gmail.com",
    },
    {
      nom: "ndoye",
      prenom: "Libasse",
      email: "test@gmail.com",
    },
    {
      nom: "Ba",
      prenom: "Khady",
      Email: "dija@gmail.com",
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
