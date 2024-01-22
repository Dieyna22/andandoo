import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInternauteComponent } from './footer-internaute.component';

describe('FooterInternauteComponent', () => {
  let component: FooterInternauteComponent;
  let fixture: ComponentFixture<FooterInternauteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterInternauteComponent]
    });
    fixture = TestBed.createComponent(FooterInternauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
