import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTrajetsComponent } from './mes-trajets.component';

describe('MesTrajetsComponent', () => {
  let component: MesTrajetsComponent;
  let fixture: ComponentFixture<MesTrajetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesTrajetsComponent]
    });
    fixture = TestBed.createComponent(MesTrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
