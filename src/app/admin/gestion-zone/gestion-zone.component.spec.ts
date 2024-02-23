import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionZoneComponent } from './gestion-zone.component';
import { ZoneService } from 'src/app/services/zone.service';
import { HttpClientModule } from '@angular/common/http';

describe('GestionZoneComponent', () => {
  let component: GestionZoneComponent;
  let fixture: ComponentFixture<GestionZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionZoneComponent, ZoneService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(GestionZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
