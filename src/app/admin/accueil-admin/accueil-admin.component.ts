import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit {
  // Déclaration des variables 
  tabMessages = [
    {
      nom: "Astou Diouf",
      Email: "ayou@gmail.com",
      messages: "ceci est un message de test",
    },
    {
      nom: "Amy Ndiaye",
      Email: "test@gmail.com",
      messages: "ceci est un message de test",
    },
    {
      nom: "pape sidy",
      Email: "fun@gmail.com",
      messages: "ceci est un message de test",
    },
    {
      nom: "Marie diagne",
      Email: "bg@gmail.com",
      messages: "ceci est un message de test",
    },
    {
      nom: "mame anta",
      Email: "test@gmail.com",
      messages: "ceci est un message de test",
    },
    {
      nom: "Alioune diop",
      Email: "fun@gmail.com",
      messages: "ceci est un message de test",
    },
    {
      nom: "Rokhaya diaw",
      Email: "bg@gmail.com",
      messages: "ceci est un message de test",
    },
    {
      nom: "Libasse ndoye",
      Email: "test@gmail.com",
      messages: "ceci est un message de test",
    },
    {
      nom: "Khady Ba",
      Email: "DDD",
      messages: "ceci est un message de test",
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
    this.tabReaseauFilter = this.tabMessages;
  }

  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le nom ou le prenom 
    this.tabReaseauFilter = this.tabMessages.filter(
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
