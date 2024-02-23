import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublierTrajetComponent } from './publier-trajet.component';
import { HttpClientModule } from '@angular/common/http';
import { TrajetService } from 'src/app/services/trajet.service';


describe('PublierTrajetComponent', () => {
  let component: PublierTrajetComponent;
  let fixture: ComponentFixture<PublierTrajetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublierTrajetComponent,TrajetService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(PublierTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
