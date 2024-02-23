import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesEnCoursComponent } from './historiques-en-cours.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../header-footer/header/header.component';
import { FooterComponent } from '../../header-footer/footer/footer.component';

describe('HistoriquesEnCoursComponent', () => {
  let component: HistoriquesEnCoursComponent;
  let fixture: ComponentFixture<HistoriquesEnCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriquesEnCoursComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(HistoriquesEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
