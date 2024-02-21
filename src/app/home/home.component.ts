import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import Swal from 'sweetalert2';
import { AvisService } from '../services/avis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nomComplet: string = '';
  email: string = '';
  contenue: string = '';

  tabAvis: any[] = [];

  // Déclaration des méthodes 
  constructor(private sendMessage: MessageService, private getAvisService: AvisService) { }
  
  ngOnInit(): void {
    this.listeAvis();
  }

  addSms = {
    NomComplet: this.nomComplet,
    Email: this.email,
    Contenue:this.contenue,
  };

  error: any;
  sendMessages() {
   let addSms = {
      NomComplet: this.nomComplet,
      Email: this.email,
      Contenue: this.contenue,
    };
    this.sendMessage.postSms(addSms).subscribe(
      (response: any) => {
        console.log('Réponse du service après ajout d\'User :', response);
        // this.alertMessage("success", "Good...", response.message);
        this.error = response.errorList;
        this.nomComplet = '';
        this.email = '';
        this.contenue='';
      },
      (err) => {
        console.log(err);
      }
    );
  }

  listeAvis() {
    this.getAvisService.getAllAvis().subscribe(
      (avis: any) => {
        this.tabAvis = avis;
        console.error(this.tabAvis);
      },
      (err) => {
        console.warn(err);
      }
    )
  }

  getArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index + 1);
  }

  calculateAverageRating(avis: any[]): number {
  if (!avis || avis.length === 0) {
    return 0;
  }

  const totalRating = avis.reduce((sum, review) => sum + review.Notation, 0);
  return totalRating / avis.length;
}

generateStarArray(rating: number): any[] {
const starArray = [];
const fullStars = Math.floor(rating);
const halfStar = rating - fullStars >= 0.5;

for (let i = 0; i < fullStars; i++) {
  starArray.push('full');
}

if (halfStar) {
  starArray.push('half');
}

const remainingStars = 5 - starArray.length;

for (let i = 0; i < remainingStars; i++) {
  starArray.push('empty');
}

return starArray;
}
  
  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  
  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabAvis.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabAvis.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabAvis.length / this.itemsParPage);
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
