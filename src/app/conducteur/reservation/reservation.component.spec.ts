import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationComponent } from './reservation.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../header-footer/header/header.component';
import { FooterComponent } from '../../header-footer/footer/footer.component';

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
