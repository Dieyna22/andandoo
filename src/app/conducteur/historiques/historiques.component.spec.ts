import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesComponent } from './historiques.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../header-footer/header/header.component';
import { FooterComponent } from '../../header-footer/footer/footer.component';


describe('HistoriquesComponent', () => {
  let component: HistoriquesComponent;
  let fixture: ComponentFixture<HistoriquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriquesComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(HistoriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
