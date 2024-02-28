import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  boutonActif = 1;
  constructor(private route: Router, private logoutService: AuthService) { }
  
  logout(){
    let admin = {
      email: "admin@gmail.com",
      password: "admin123"
    };

    Swal.fire({
      title: "Êtes-vous sûr de vouloir vous déconnecter ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA7436",
      cancelButtonColor: "#FA0436",
      confirmButtonText: "Oui, me déconnecter"
    }).then((result) => {
      if (result.isConfirmed) {
        this.logoutService.déconnexionAdmin(admin).subscribe(
          (response) => {
            console.log(response);
            localStorage.removeItem('userOnline');
            localStorage.setItem("isAdmin", JSON.stringify(false));
            localStorage.setItem("isUsers", JSON.stringify(false));
            localStorage.setItem("isChauffeur", JSON.stringify(false));
            console.log(response);
            this.route.navigate(['/accueil']);
          })
      }
    });
   
  }
}
