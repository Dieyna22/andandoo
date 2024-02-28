import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GestionUsersComponent } from './admin/gestion-users/gestion-users.component';
import { GestionNewslettersComponent } from './admin/gestion-newsletters/gestion-newsletters.component';
import { GestionZoneComponent } from './admin/gestion-zone/gestion-zone.component';
import { PublierTrajetComponent } from './conducteur/publier-trajet/publier-trajet.component';
import { ReserverTrajetComponent } from './conducteur/reserver-trajet/reserver-trajet.component';
import { MesTrajetsComponent } from './conducteur/mes-trajets/mes-trajets.component';
import { FAQComponent } from './conducteur/faq/faq.component';
import { AccueilComponent } from './conducteur/accueil/accueil.component';
import { HeaderComponent } from './header-footer/header/header.component';
import { HeaderInternauteComponent } from './header-footer/header-internaute/header-internaute.component';
import { FooterInternauteComponent } from './header-footer/footer-internaute/footer-internaute.component';
import { FooterComponent } from './header-footer/footer/footer.component';
import { SidebarComponent } from './header-footer/sidebar/sidebar.component';
import { ConfidentialiteComponent } from './politiques/confidentialite/confidentialite.component';
import { UtilisationComponent } from './politiques/utilisation/utilisation.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AccueilAdminComponent } from './admin/accueil-admin/accueil-admin.component';
import { ProfilComponent } from './admin/profil/profil.component';
import { ReservationComponent } from './conducteur/reservation/reservation.component';
import { HistoriquesComponent } from './conducteur/historiques/historiques.component';
import { HistoriquesEnCoursComponent } from './conducteur/historiques-en-cours/historiques-en-cours.component';
import { FaqConducteurComponent } from './conducteur/faq-conducteur/faq-conducteur.component';
import { NavbarComponent } from './header-footer/navbar/navbar.component';
import { ProfilUsersComponent } from './conducteur/profil-users/profil-users.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/interceptor';
import { ConducteurComponent } from './admin/conducteur/conducteur.component';
import { VoituresComponent } from './admin/voitures/voitures.component';
import { CompteComponent } from './admin/compte/compte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionUsersComponent,
    GestionNewslettersComponent,
    GestionZoneComponent,
    PublierTrajetComponent,
    ReserverTrajetComponent,
    MesTrajetsComponent,
    FAQComponent,
    AccueilComponent,
    HeaderComponent,
    HeaderInternauteComponent,
    FooterInternauteComponent,
    FooterComponent,
    SidebarComponent,
    ConfidentialiteComponent,
    UtilisationComponent,
    HomeComponent,
    AccueilAdminComponent,
    ProfilComponent,
    ReservationComponent,
    HistoriquesComponent,
    HistoriquesEnCoursComponent,
    FaqConducteurComponent,
    NavbarComponent,
    ProfilUsersComponent,
    ConducteurComponent,
    VoituresComponent,
    CompteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    DataTablesModule,
    HttpClientModule,
    // ReactiveFormsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
