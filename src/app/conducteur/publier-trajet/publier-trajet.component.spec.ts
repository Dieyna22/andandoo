import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublierTrajetComponent } from './publier-trajet.component';

describe('PublierTrajetComponent', () => {
  let component: PublierTrajetComponent;
  let fixture: ComponentFixture<PublierTrajetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublierTrajetComponent]
    });
    fixture = TestBed.createComponent(PublierTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
