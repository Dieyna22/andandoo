import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverTrajetComponent } from './reserver-trajet.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation.service';
import { TrajetService } from 'src/app/services/trajet.service';

describe('ReserverTrajetComponent', () => {
  let component: ReserverTrajetComponent;
  let fixture: ComponentFixture<ReserverTrajetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserverTrajetComponent, ReservationService, TrajetService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ReserverTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
