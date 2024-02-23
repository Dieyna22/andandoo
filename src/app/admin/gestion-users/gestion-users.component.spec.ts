import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsersComponent } from './gestion-users.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { HttpClientModule } from '@angular/common/http';

describe('GestionUsersComponent', () => {
  let component: GestionUsersComponent;
  let fixture: ComponentFixture<GestionUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionUsersComponent, UtilisateurService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(GestionUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
