import { Component } from '@angular/core';
import { NewsletterService } from 'src/app/services/newsletter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';

  constructor(private ajoutNews: NewsletterService) { }
  
  ajouterNews() {
    const addNews = {
      email:this.email,
    }
    console.log(addNews.email);
    this.ajoutNews.postNewsletter(addNews).subscribe(
      (response: any) => {
        console.log('Réponse du service après ajout d\'User :', response);
        this.alertMessage("success", "Good job!", response);
        this.email = '';
      },
      (err) => {
        console.warn(err);
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
