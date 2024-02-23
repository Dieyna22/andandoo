import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQComponent } from './faq.component';
import { HeaderComponent } from '../../header-footer/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../../header-footer/footer/footer.component';

describe('FAQComponent', () => {
  let component: FAQComponent;
  let fixture: ComponentFixture<FAQComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FAQComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(FAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
