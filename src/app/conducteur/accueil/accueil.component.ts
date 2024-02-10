import { Component } from '@angular/core';
import { ZoneService } from '../../services/zone.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  tabZone: any[] = [];
  tabAllUser: any;
 

  constructor(private lieu: ZoneService, private users: UtilisateurService) { }

  ngOnInit() {
    this.lieu.getAllZones().subscribe((zones: any) => {
      this.tabZone = zones;
      console.log(this.tabZone);
    })

    this.users.statUser().subscribe((users: any) => {
      this.tabAllUser = users;
      console.log(this.tabAllUser);
    })

  }
}
