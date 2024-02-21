import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit {
  // Déclaration des variables 
  tabMessages: any[] = [];
  tabMessagesFilter: any[] = [];
  filterValue: string = "";

  mail: string = "";
  message: string = "";
  contenue: string = "";

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  /// Déclaration des méthodes 
  constructor(private listMessage: MessageService, private send: MessageService) { }

  ngOnInit(): void {
    this.listeMessage();
  }

  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le nom ou le prenom 
    this.tabMessagesFilter = this.tabMessages.filter(
      (elt: any) => (elt?.nomComplet.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    if (Array.isArray(this.tabMessagesFilter)) {
      const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
      const indexFin = indexDebut + this.itemsParPage;
      return this.tabMessagesFilter.slice(indexDebut, indexFin);
    } else {
      return [];
    }
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabMessagesFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabMessagesFilter.length / this.itemsParPage);
  }

  listeMessage() {
    this.listMessage.getAllSms().subscribe(
      (list: any) => {
        this.tabMessages = list;
        this.tabMessagesFilter = this.tabMessages;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  CurrentItem: any;
  // Methode pour charger les infos 
  chargerInfos(paramItem: any) {
    this.CurrentItem = paramItem;
    this.mail = paramItem.email;
    this.message = paramItem.contenue;
  }



  sendReponse() {
    const sendRes = {
      email: this.mail,
      contenue: this.contenue,
    };
  
    console.error(sendRes.email);
    this.send.sendResponse(sendRes).subscribe(
      (response) => {
        console.warn(response);
      },
      (err) => { 
        console.log(err);
      }
    )
  }
}
