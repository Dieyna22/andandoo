import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-users',
  templateUrl: './profil-users.component.html',
  styleUrls: ['./profil-users.component.css']
})
export class ProfilUsersComponent  {
  dbUsers: any;
  userConnect: any;

  ngOnInit() {
    this.dbUsers = JSON.parse(localStorage.getItem("userOnline") || "[]");
    console.log(this.dbUsers.original);
    this.userConnect = this.dbUsers.original.data.utilisateur;
    console.error(this.userConnect);
  }



}
