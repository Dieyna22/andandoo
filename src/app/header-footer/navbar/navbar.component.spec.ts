import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ZoneService } from '../../services/zone.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { HttpClientModule } from '@angular/common/http';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, ZoneService, UtilisateurService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
