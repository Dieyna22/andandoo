import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUsersComponent } from './profil-users.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../header-footer/header/header.component';
import { FooterComponent } from '../../header-footer/footer/footer.component';

describe('ProfilUsersComponent', () => {
  let component: ProfilUsersComponent;
  let fixture: ComponentFixture<ProfilUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilUsersComponent, HeaderComponent, FooterComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ProfilUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
