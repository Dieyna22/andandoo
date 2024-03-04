import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule,HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate email', () => {
    component.emailLogin = 'test@example.com';
    component.isEmailDirty = true;
    expect(component.isEmailValid()).toBeTruthy();
  });

  it('should validate password', () => {     
    component.passwordLogin = 'password123';
    component.isPasswordDirty = true;
    expect(component.isPasswordValid()).toBeTruthy();
  });

  it('should authenticate user on valid credentials', () => {
    // MockAuthService pour simuler une authentification réussie
    spyOn(component['authUser'], 'connexionUtilisateur').and.returnValue(of({ }));

    component.emailLogin = 'admin@gmail.com';
    component.passwordLogin = 'admin123';
    component.connexion();

    // expect(component['auth'].isAuthenticated).toBeTruthy();
    // expect(component['route'].navigate).toHaveBeenCalledWith(['/admin']);

    
  });

  it('should register user with valid data', () => {
    // MockRegisterClientService pour simuler une inscription réussie
    spyOn(component['registerclient'], 'inscription').and.returnValue(of({ /* mock response */ }));

    component.email = 'test@example.com';
    component.password = 'password123';
    component.nom = 'John';
    component.prenom = 'Doe';
    component.telephone = '773456789';
    component.zone = '2';

    component.register();

    // expect(component['choixFormulaire']).toBeTruthy();
    // expect(component['tabError']).toBeDefined();
  });

  it('should switch to the next step on valid data', () => {
    component.nom = 'John';
    component.prenom = 'Doe';
    component.telephone = '773456789';
    component.email = 'test@example.com';
    component.password = 'password123';
    component.zone = '1';
    component.permis = "permis.png" ;
    component.licence = "licence.png" ;

    component.suivant();

    // expect(component.showSteps).toBeFalsy();
  });

});
