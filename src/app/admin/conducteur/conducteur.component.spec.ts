import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurComponent } from './conducteur.component';
import { MessageService } from 'src/app/services/message.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { HttpClientModule } from '@angular/common/http';

describe('ConducteurComponent', () => {
  let component: ConducteurComponent;
  let fixture: ComponentFixture<ConducteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConducteurComponent, MessageService, UtilisateurService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
