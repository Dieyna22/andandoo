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
import { AdminGuard, ChauffeurGuard, UsersGuard } from './services/guard';
import { ConducteurComponent } from './admin/conducteur/conducteur.component';
import { VoituresComponent } from './admin/voitures/voitures.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent, title: 'Accueil' },
  { path: 'connexion', component: LoginComponent, title: 'Connexion' },
  { path: 'admin', component: AccueilAdminComponent, title: 'Admin', canActivate: [AdminGuard]},
  { path: 'users', component: GestionUsersComponent, title: 'Clients', canActivate: [AdminGuard] },
  { path: 'news', component: GestionNewslettersComponent, title: 'Newsletters', canActivate: [AdminGuard] },
  { path: 'zone', component: GestionZoneComponent, title: 'Zones', canActivate: [AdminGuard] },
  { path: 'profil', component: ProfilComponent, title: 'ProfilAdmin'},
  { path: 'conf', component: ConfidentialiteComponent, title: 'Politique Confidentialite', canActivate: [UsersGuard] },
  { path: 'utilisation', component: UtilisationComponent, title: 'Politique utilisation', canActivate: [UsersGuard] },
  { path: 'accueilUtilisateur', component: AccueilComponent, title: 'Accueil Utilisateur', canActivate: [UsersGuard] },
  { path: 'publierTrajet', component: PublierTrajetComponent, title: 'Publier Trajet', canActivate: [ChauffeurGuard] },
  { path: 'reserverTrajet', component: ReserverTrajetComponent, title: 'Reserver Trajet', canActivate: [UsersGuard] },
  { path: 'mesTrajets', component: MesTrajetsComponent, title: 'Mes Trajets', canActivate: [ChauffeurGuard] },
  { path: 'reservation', component: ReservationComponent, title: 'Reservation', canActivate: [ChauffeurGuard] },
  { path: 'historique', component: HistoriquesComponent, title: 'Historiques', canActivate: [ChauffeurGuard] },
  { path: 'enCours', component: HistoriquesEnCoursComponent, title: 'EnCours', canActivate: [ChauffeurGuard] },
  { path: 'faqP', component: FAQComponent, title: 'Faq Passager', canActivate: [UsersGuard] },
  { path: 'faqC', component: FaqConducteurComponent, title: 'Faq Conducteur', canActivate: [UsersGuard] },
  { path: 'profilUser', component: ProfilUsersComponent, title: 'Profil Utilisateur', canActivate: [UsersGuard] },
  { path: 'conducteur', component: ConducteurComponent, title: 'Conducteur', canActivate: [AdminGuard] },
  { path: 'voitures', component: VoituresComponent, title: 'voitures', canActivate: [AdminGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
