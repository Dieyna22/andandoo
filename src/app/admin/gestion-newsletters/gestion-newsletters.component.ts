import { Component,OnInit } from '@angular/core';
import { NewsletterService } from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-gestion-newsletters',
  templateUrl: './gestion-newsletters.component.html',
  styleUrls: ['./gestion-newsletters.component.css']
})
export class GestionNewslettersComponent implements OnInit {
  // Déclaration des variables 
  tabNews:any[]= [];
 

  tabNewsFilter: any[]=[];

  filterValue: string = "";


  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  constructor(private listeNews: NewsletterService) { }

  listerNews() {
    this.listeNews.getAllNewsletter().subscribe(
      (news: any) => {
        this.tabNews = news;
        this.tabNewsFilter = this.tabNews;
      },
      (err) => {
        
      }
    )
  }

  ngOnInit(): void {
    this.listerNews();
  }

  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le nom ou le prenom 
    this.tabNewsFilter = this.tabNews.filter(
      (elt: any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }


  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabNewsFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabNewsFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabNewsFilter.length / this.itemsParPage);
  }
}
