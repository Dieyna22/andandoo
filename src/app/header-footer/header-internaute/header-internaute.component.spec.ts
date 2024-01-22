import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInternauteComponent } from './header-internaute.component';

describe('HeaderInternauteComponent', () => {
  let component: HeaderInternauteComponent;
  let fixture: ComponentFixture<HeaderInternauteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderInternauteComponent]
    });
    fixture = TestBed.createComponent(HeaderInternauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
