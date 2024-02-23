import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqConducteurComponent } from './faq-conducteur.component';
import { HeaderComponent } from '../../header-footer/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../../header-footer/footer/footer.component';
import { LoginComponent } from '../../login/login.component';

describe('FaqConducteurComponent', () => {
  let component: FaqConducteurComponent;
  let fixture: ComponentFixture<FaqConducteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqConducteurComponent, HeaderComponent, FooterComponent, LoginComponent],
       imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(FaqConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
