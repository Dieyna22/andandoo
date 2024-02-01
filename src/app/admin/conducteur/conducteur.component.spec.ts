import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurComponent } from './conducteur.component';

describe('ConducteurComponent', () => {
  let component: ConducteurComponent;
  let fixture: ComponentFixture<ConducteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConducteurComponent]
    });
    fixture = TestBed.createComponent(ConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
