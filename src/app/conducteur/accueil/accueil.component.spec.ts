import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilComponent } from './accueil.component';
import { ZoneService } from '../../services/zone.service';
import { HttpClientModule } from '@angular/common/http';

describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilComponent, ZoneService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
