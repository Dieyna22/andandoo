import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationComponent } from './utilisation.component';
import { HeaderComponent } from '../../header-footer/header/header.component';
import { FooterComponent } from '../../header-footer/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

describe('UtilisationComponent', () => {
  let component: UtilisationComponent;
  let fixture: ComponentFixture<UtilisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisationComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(UtilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
