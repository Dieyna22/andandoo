import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAdminComponent } from './accueil-admin.component';
import { MessageService } from 'src/app/services/message.service';
import { HttpClientModule } from '@angular/common/http';

describe('AccueilAdminComponent', () => {
  let component: AccueilAdminComponent;
  let fixture: ComponentFixture<AccueilAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilAdminComponent, MessageService],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(AccueilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
