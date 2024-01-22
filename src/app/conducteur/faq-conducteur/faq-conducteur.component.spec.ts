import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqConducteurComponent } from './faq-conducteur.component';

describe('FaqConducteurComponent', () => {
  let component: FaqConducteurComponent;
  let fixture: ComponentFixture<FaqConducteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqConducteurComponent]
    });
    fixture = TestBed.createComponent(FaqConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
