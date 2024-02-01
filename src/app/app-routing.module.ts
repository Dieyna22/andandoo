import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccueilAdminComponent } from './admin/accueil-admin/accueil-admin.component';
import { GestionUsersComponent } from './admin/gestion-users/gestion-users.component';
import { GestionNewslettersComponent } from './admin/gestion-newsletters/gestion-newsletters.component';
import { GestionZoneComponent } from './admin/gestion-zone/gestion-zone.component';
import { ProfilComponent } from './admin/profil/profil.component';
import { ConfidentialiteComponent } from './politiques/confidentialite/confidentialite.component';
import { UtilisationComponent } from './politiques/utilisation/utilisation.component';
import { AccueilComponent } from './conducteur/accueil/accueil.component';
import { PublierTrajetComponent } from './conducteur/publier-trajet/publier-trajet.component';
import { ReserverTrajetComponent } from './conducteur/reserver-trajet/reserver-trajet.component';
import { MesTrajetsComponent } from './conducteur/mes-trajets/mes-trajets.component';
import { ReservationComponent } from './conducteur/reservation/reservation.component';
import { HistoriquesComponent } from './conducteur/historiques/historiques.component';
import { HistoriquesEnCoursComponent } from './conducteur/historiques-en-cours/historiques-en-cours.component';
import { FAQComponent } from './conducteur/faq/faq.component';
import { FaqConducteurComponent } from './conducteur/faq-conducteur/faq-conducteur.component';
import { ProfilUsersComponent } from './conducteur/profil-users/profil-users.component';
// import { AuthGuard } from './admin.guard';
import { AuthentificationGuard } from './services/guard';
import { ConducteurComponent } from './admin/conducteur/conducteur.component';
// import { adminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent, title: 'Accueil' },
  { path: 'connexion', component: LoginComponent, title: 'Connexion' },
  { path: 'admin', component: AccueilAdminComponent, title: 'Admin'},
  { path: 'users', component: GestionUsersComponent, title: 'Clients'},
  { path: 'news', component: GestionNewslettersComponent, title: 'Newsletters'},
  { path: 'zone', component: GestionZoneComponent, title: 'Zones'},
  { path: 'profil', component: ProfilComponent, title: 'ProfilAdmin'},
  { path: 'conf', component: ConfidentialiteComponent, title: 'Politique Confidentialite'},
  { path: 'utilisation', component: UtilisationComponent, title:'Politique utilisation' },
  { path: 'accueilUtilisateur', component: AccueilComponent,title:'Accueil Utilisateur' },
  { path: 'publierTrajet', component: PublierTrajetComponent, title:'Publier Trajet' },
  { path: 'reserverTrajet', component: ReserverTrajetComponent, title:'Reserver Trajet' },
  { path: 'mesTrajets', component: MesTrajetsComponent,title:'Mes Trajets'},
  { path: 'reservation', component: ReservationComponent, title:'Reservation'},
  { path: 'historique', component: HistoriquesComponent, title:'Historiques'},
  { path: 'enCours', component: HistoriquesEnCoursComponent,title:'EnCours'},
  { path: 'faqP', component: FAQComponent, title:'Faq Passager'},
  { path: 'faqC', component: FaqConducteurComponent, title:'Faq Conducteur'},
  { path: 'profilUser', component: ProfilUsersComponent, title: 'Profil Utilisateur' },
  { path: 'conducteur', component: ConducteurComponent, title: 'Conducteur' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
