import { Component } from '@angular/core';
import { VoitureService } from '../services/voiture.service';
import { MessageService } from '../services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nomComplet: string = '';
  email: string = '';
  contenue: string = '';

  // Déclaration des méthodes 
  constructor(private sendMessage: MessageService) { }
  
  addSms = {
    NomComplet: this.nomComplet,
    Email: this.email,
    Contenue:this.contenue,
  };

  ajouterZone() {
   let addSms = {
      NomComplet: this.nomComplet,
      Email: this.email,
      Contenue: this.contenue,
    };
    alert('test ajout')
    this.sendMessage.postSms(addSms).subscribe(
      (response: any) => {
        console.log('Réponse du service après ajout d\'User :', response);
        this.alertMessage("success", "Good...", response.message);
        this.addSms = { NomComplet: '', Email: '', Contenue: '', };
        this.nomComplet = '';
        this.email = '';
        this.contenue='';
      },
      (err) => {
        console.log(err);
      }
    );
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
