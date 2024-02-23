import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTrajetsComponent } from './mes-trajets.component';
import { AvisService } from 'src/app/services/avis.service';
import { TrajetService } from 'src/app/services/trajet.service';
import { HttpClientModule } from '@angular/common/http';

describe('MesTrajetsComponent', () => {
  let component: MesTrajetsComponent;
  let fixture: ComponentFixture<MesTrajetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesTrajetsComponent, AvisService, TrajetService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(MesTrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
