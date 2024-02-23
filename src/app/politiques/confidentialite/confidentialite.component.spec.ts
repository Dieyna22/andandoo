import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialiteComponent } from './confidentialite.component';
import { HeaderComponent } from '../../header-footer/header/header.component';
import { FooterComponent } from '../../header-footer/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

describe('ConfidentialiteComponent', () => {
  let component: ConfidentialiteComponent;
  let fixture: ComponentFixture<ConfidentialiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfidentialiteComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ConfidentialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
