import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../../services/zone.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  tabZone: any[] = [];
  tabClients: any[] = [];
  tabConducteurs: any[] = [];
  tabUsers: any[] = [];
 

  constructor(private lieu: ZoneService, private client: UtilisateurService, private conducteur:UtilisateurService , private users:UtilisateurService){ }

  ngOnInit() {
    this.lieu.getAllZones().subscribe((zones: any) => {
      this.tabZone = zones;
    })

    this.client.getAllClients().subscribe((clients: any) => {
      this.tabClients = clients;
    })

    this.conducteur.getAllConducteur().subscribe((Conducteurs: any) => {
      this.tabConducteurs = Conducteurs;
    })

    this.conducteur.getAllUsers().subscribe((utilisateurs: any) => {
      this.tabUsers = utilisateurs;
    })

  }

}
