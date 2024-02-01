import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  // Déclaration des variables 
  tabReservation = [
    {
      profil: "https://i.pinimg.com/236x/ec/01/8e/ec018ee761344a3248fe013ba6048aa9.jpg",
      prenom: "Astou",
      nom: "Diouf",
      depart: "Pikine",
      arriver: "Yoff",
      date: "12/09/2015",
      heure: "18:00:00",
    },
    {
      profil: "https://i.pinimg.com/236x/ec/01/8e/ec018ee761344a3248fe013ba6048aa9.jpg",
      prenom: "Astou",
      nom: "Diouf",
      depart: "Sandaga",
      arriver: "Yoff",
      date: "19/09/2015",
      heure: "07:00:00",
    },
    {
      profil: "https://i.pinimg.com/236x/3e/7f/93/3e7f9375439a273f916b2fe2fb0545c6.jpg",
      prenom: "Fatou",
      nom: "Ndiaye",
      depart: "Pikine",
      arriver: "Centre ville",
      date: "23/09/2015",
      heure: "12:00:00",
    },
    {
      profil: "https://i.pinimg.com/236x/ec/01/8e/ec018ee761344a3248fe013ba6048aa9.jpg",
      prenom: "Astou",
      nom: "Diouf",
      depart: "Mbour",
      arriver: "Dakar",
      date: "23/05/2024",
      heure: "07:00:00",
    },
    {
      profil: "https://i.pinimg.com/236x/ec/01/8e/ec018ee761344a3248fe013ba6048aa9.jpg",
      prenom: "Astou",
      nom: "Diouf",
      depart: "Bambey",
      arriver: "Dakar",
      date: "25/01/2024",
      heure: "07:00:00",
    },
    {
      profil: "https://i.pinimg.com/236x/ec/01/8e/ec018ee761344a3248fe013ba6048aa9.jpg",
      prenom: "Astou",
      nom: "Diouf",
      depart: "Saly",
      arriver: "Foire",
      date: "03/02/2024",
      heure: "07:00:00",
    },
    {
      profil: "https://i.pinimg.com/236x/3e/7f/93/3e7f9375439a273f916b2fe2fb0545c6.jpg",
      prenom: "Libasse",
      nom: "Ndoye",
      depart: "Keur Masar",
      arriver: "Yoff",
      date: "05/02/2024",
      heure: "07:00:00",
    },
    {
      profil: "https://i.pinimg.com/236x/3e/7f/93/3e7f9375439a273f916b2fe2fb0545c6.jpg",
      prenom: "Arame",
      nom: "Ndoye",
      depart: "Ouakam",
      arriver: "Yoff",
      date: "05/02/2024",
      heure: "07:00:00",
    },
  ];

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getItemsPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabReservation.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabReservation.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabReservation.length / this.itemsParPage);
  }

}
