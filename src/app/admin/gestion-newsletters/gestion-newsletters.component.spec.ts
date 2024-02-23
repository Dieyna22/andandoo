import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNewslettersComponent } from './gestion-newsletters.component';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { HttpClientModule } from '@angular/common/http';

describe('GestionNewslettersComponent', () => {
  let component: GestionNewslettersComponent;
  let fixture: ComponentFixture<GestionNewslettersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionNewslettersComponent, NewsletterService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(GestionNewslettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
