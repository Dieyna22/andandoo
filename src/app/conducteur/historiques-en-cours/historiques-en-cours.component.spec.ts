import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesEnCoursComponent } from './historiques-en-cours.component';

describe('HistoriquesEnCoursComponent', () => {
  let component: HistoriquesEnCoursComponent;
  let fixture: ComponentFixture<HistoriquesEnCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriquesEnCoursComponent]
    });
    fixture = TestBed.createComponent(HistoriquesEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
