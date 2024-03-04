import { Component,OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit  {
  // Déclaration des variables 
  tabClients: any[] = [];
  

  tabClientFilter: any[] = [];

  filterValue: string = "";


  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Déclaration des méthodes 
  constructor( private client: UtilisateurService) { }

  ngOnInit(): void {
    this.client.getAllClients().subscribe((clients: any) => {
      this.tabClients = clients;
      this.tabClientFilter = this.tabClients;
    })
  }

  // detail du passager cliqué
  curentClient: any;
  detailClient(paramClient: any) {
    this.curentClient = this.tabClientFilter.find((item: any) => item.id == paramClient)
  }

  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le nom ou le prenom 
    this.tabClientFilter = this.tabClients.filter(
      (elt: any) => (elt?.Nom.toLowerCase().includes(this.filterValue.toLowerCase()) || elt?.Prenom.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabClientFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabClientFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabClientFilter.length / this.itemsParPage);
  }
}
