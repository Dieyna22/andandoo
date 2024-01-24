import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-zone',
  templateUrl: './gestion-zone.component.html',
  styleUrls: ['./gestion-zone.component.css']
})
export class GestionZoneComponent implements OnInit  {
  // Déclaration des variables 
  tabUsers = [
    {
      nom: "Dakar",
    },
    {
      nom: "Thies",
    },
    {
      nom: "Saint-louis",
    },
    {
      nom: "Pikine",
    },
    {
      nom: "Sandaga",
    },
    {
      nom: "Centre ville",
    },
    {
      nom: "Mbour",
    },
    {
      nom: "Keur massar",
    },
    {
      nom: "Yoff",
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
