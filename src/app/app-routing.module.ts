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

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'admin', component: AccueilAdminComponent },
  { path: 'users', component: GestionUsersComponent },
  { path: 'news', component: GestionNewslettersComponent },
  { path: 'zone', component: GestionZoneComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'conf', component: ConfidentialiteComponent },
  { path: 'utilisation', component: UtilisationComponent },
  { path: 'accueilUtilisateur', component: AccueilComponent },
  { path: 'publierTrajet', component: PublierTrajetComponent },
  { path: 'reserverTrajet', component: ReserverTrajetComponent },
  { path: 'mesTrajets', component: MesTrajetsComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'historique', component: HistoriquesComponent },
  { path: 'enCours', component: HistoriquesEnCoursComponent },
  { path: 'faqP', component: FAQComponent },
  { path: 'faqC', component: FaqConducteurComponent },
  { path: 'profilUser', component: ProfilUsersComponent },





  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
