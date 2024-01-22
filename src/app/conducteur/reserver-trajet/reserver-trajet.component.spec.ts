import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverTrajetComponent } from './reserver-trajet.component';

describe('ReserverTrajetComponent', () => {
  let component: ReserverTrajetComponent;
  let fixture: ComponentFixture<ReserverTrajetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserverTrajetComponent]
    });
    fixture = TestBed.createComponent(ReserverTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
