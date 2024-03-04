import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/services/apiUrl';
import { ZoneService } from 'src/app/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-zone',
  templateUrl: './gestion-zone.component.html',
  styleUrls: ['./gestion-zone.component.css']
})
export class GestionZoneComponent implements OnInit {
  // Déclaration des variables 
  tabZone: any[] = [];
  tabZoneFilter: any[] = [];
  filterValue: string = "";

  inputNom: string = '';

  // Variables pour faire la vérifications
  verifNom: String = "";

  // Variables si les champs sont exacts
  exactNom: boolean = false;

  // Verification du zone
  verifNonZoneFonction() {
    this.exactNom = false;
    const expressionReguliere = /^[a-zA-Z]+$/;
    if (this.addUser.NomZ == "") {
      this.verifNom = "";
      // this.verifNom = "Le lieu de départ est obligatoire.";
    }
    else if (!expressionReguliere.test(this.addUser.NomZ)) {
      this.verifNom = "la zone doit pas contenir de nombres.";
    }
    else if (this.addUser.NomZ.length < 4) {
      this.verifNom = "la zone ne doit pas etre inferieur a 4 caractères.";
    }
    else {
      this.verifNom = "";
      this.exactNom = true;
    }
  }

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Déclaration des méthodes 
  constructor(private http: HttpClient, private zone: ZoneService, private ajoutService: ZoneService, private deleteZone: ZoneService) { }


  ngOnInit(): void {
    this.listeZone();
  }

  addUser = {
    NomZ: '',
  };

  listeZone() {
    this.zone.getAllZones().subscribe(
      (zones: any) => {
        this.tabZone = zones;
        this.tabZoneFilter = this.tabZone;
      },
      (err) => {
      }
    )
  }

  error: any;
  ajouterZone() {
    this.ajoutService.postZone(this.addUser).subscribe((response: any) => {
      this.error = response.errorList;
      this.addUser = { NomZ: '' };
      this.listeZone();
    });
  }

  supprimerZone(zoneId: any) {
    Swal.fire({
      title: "Etes vous sur",
      text: "voulez vous supprimer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "OUI !!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteZone.deleteZone(zoneId).subscribe((resp: any) => {
          this.alertMessage("success", "Bravo", resp);
          this.listeZone();
        });
      }
    });

  }

  exactNomUpdate: boolean = false;
  verifNomUpdate: string = '';
  // Verification du zone
  verifNonZoneUpdateFonction() {
    this.exactNomUpdate = false;
    const expressionReguliere = /^[a-zA-Z]+$/;
    if (this.inputNom == "") {
      this.verifNomUpdate = "";
      // this.verifNom = "Le lieu de départ est obligatoire.";
    }
    else if (!expressionReguliere.test(this.inputNom)) {
      this.verifNomUpdate = "la zone doit pas contenir de nombres.";
    }
    else if (this.inputNom.length < 4) {
      this.verifNomUpdate = "la zone ne doit pas etre inferieur a 4 caractères.";
    }
    else {
      this.verifNomUpdate = "";
      this.exactNomUpdate = true;
    }
  }

  currentZone: any;
  // Methode pour charger les infos du zone  à modifier
  chargerInfosZone(paramZone: any) {
    this.currentZone = paramZone;
    this.inputNom = paramZone.nom;
  }

  // Methode pour modifier la zone 
  MAJZone() {
    const nom = this.inputNom;

    Swal.fire({
      title: "Etes vous sur",
      text: "voulez vous modifier!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "OUI !!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const urlUser = `${apiUrl}/updatezone/${this.currentZone.id}`;
          const putData = {
            id: this.currentZone.id,
            NomZ: nom,
          }
          await this.http.post(urlUser, putData).toPromise();
          this.listeZone();
        } catch (error) {
          this.alertMessage("error", "Erreur", "Une erreur est survenue lors de la modification");
        }
      }
    });
  }

  // Methode de recherche automatique pour professeur
  onSearch() {
    // Recherche se fait selon le nom ou le prenom 
    this.tabZoneFilter = this.tabZone.filter(
      (elt: any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }


  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabZoneFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabZoneFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabZoneFilter.length / this.itemsParPage);
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
