import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conducteur',
  templateUrl: './conducteur.component.html',
  styleUrls: ['./conducteur.component.css']
})
export class ConducteurComponent {
  // Déclaration des variables 
  tabConducteurs: any[] = [];
 

  tabConducteurFilter: any[] = [];

  filterValue: string = "";
  
  mail: string = "";
  message:string="";

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Déclaration des méthodes 
  constructor(private conducteur: UtilisateurService, private temporaire: UtilisateurService, private definitive: UtilisateurService, private debloquer: UtilisateurService, private send: MessageService) { }

  ngOnInit(): void {
    this.listerConducteur();
  }

  // detail du formateur cliqué
  currentConducteur: any;
  detailConducteur(paramConducteur: any) {
    this.currentConducteur = this.tabConducteurFilter.find((item: any) => item.id == paramConducteur)
    console.log(this.currentConducteur);
  }

  // Methode desactiver Conducteur
  Desactiver(paramConducteur: any) {
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
        this.temporaire.temporaireblock(paramConducteur.id).subscribe(
          (response: any) => {
            console.log(response);
            this.alertMessage("success", "Bravo", "Conducteur bloquer avec succès");
            this.listerConducteur();
          },
          (error) => {
            console.error("Erreur lors de la mise à jour :", error);
            this.alertMessage("error", "Erreur", "Une erreur est survenue lors du blocage");
          }
        );
      }
    });
  }

  // Methode bloquer Conducteur
  bloquer(paramConducteur: any) {
    Swal.fire({
      title: "Etes-vous sur???",
      text: "voulez-vous desactiver définitivement  le conducteur",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "Oui !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.definitive.definiveblock(paramConducteur.id).subscribe(
          (response: any) => {
            console.log(response);
            this.alertMessage("success", "Bravo", "Conducteur bloquer avec succès");
            this.listerConducteur();
          },
          (error) => {
            console.error("Erreur lors de la mise à jour :", error);
            this.alertMessage("error", "Erreur", "Une erreur est survenue lors du blocage");
          }
        );
      }
    });
  }

  // Methode desactiver Conducteur
  activer(paramConducteur: any) {
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
        this.debloquer.debloquer(paramConducteur.id).subscribe(
          (response: any) => {
            console.log(response);
            this.alertMessage("success", "Bravo", "Conducteur activer avec succès");
          },
          (error) => {
            console.error(error);
            this.alertMessage("error", "Erreur", "Une erreur est survenue lors du blocage");
          }
        );
      }
    });
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
      console.log(this.tabConducteurs);
      this.tabConducteurFilter = this.tabConducteurs;
      console.log(this.tabConducteurFilter);
    })
  }

  CurrentItem: any;
 
  // Methode pour charger les infos 
  chargerInfos(paramItem: any) {
    this.CurrentItem = paramItem;
    this.mail = paramItem.Email;

  }

  sendReponse() {
    const sendSMS = {
      email: this.mail,
      contenue: this.message,
    };
    alert(sendSMS.email);
    alert(sendSMS.contenue);
    this.send.sendMessage(sendSMS).subscribe(
      (response) => {
        console.warn(response);
        this.alertMessage("success", "Bravo", response.message);
        this.mail = '';
        this.message = '';
      },
      (err) => {
        console.log(err);
      }
    )
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
