import { Component } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';
import { Loading, Notify } from 'notiflix';


@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent {
  // Déclaration des variables 
  tabConducteurs: any[] = [];


  tabConducteurFilter: any[] = [];

  filterValue: string = "";

  mail: string = "";
  message: string = "";

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Déclaration des méthodes 
  constructor(private conducteur: UtilisateurService ,private activer:UtilisateurService) { }

  ngOnInit(): void {
    this.listerConducteur();
  }

  // detail du formateur cliqué
  currentConducteur: any;
  detailConducteur(paramConducteur: any) {
    this.currentConducteur = this.tabConducteurFilter.find((item: any) => item.id == paramConducteur)
   
  }

  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le nom ou le prenom 
    this.tabConducteurFilter = this.tabConducteurs.filter(
      (elt: any) => (elt?.Nom.toLowerCase().includes(this.filterValue.toLowerCase()) || elt?.Prenom.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }

  listerConducteur() {
    this.conducteur.getAllConducteur().subscribe((Conducteurs: any) => {
      this.tabConducteurs = Conducteurs;
      this.tabConducteurFilter = this.tabConducteurs.filter((conducteur: any) => conducteur.etat == '0');
    })
  }

  // Methode activer Conducteur
  activerCompte(paramConducteur: any) {
    Swal.fire({
      title: "Etes-vous sur???",
      text: "voulez-vous desactiver",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "Oui !"
    }).then((result) => {
      if (result.isConfirmed) {
        Loading.pulse('Loading...', {
          backgroundColor: 'rgba(0,0,0,0.8)',
        });
        this.activer.activer(paramConducteur.id).subscribe(
          (response: any) => {
            Notify.success('Conducteur activer avec succès');
            Loading.remove();
            this.listerConducteur();
            // this.alertMessage("success", "Bravo", "Conducteur activer avec succès");
          },
          (error) => {
            Notify.failure('Une erreur est survenue lors du blocage');
            Loading.remove();
            // this.alertMessage("error", "Erreur", "");
          }
        );
      }
    });
  }


  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabConducteurFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabConducteurFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabConducteurFilter.length / this.itemsParPage);
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
