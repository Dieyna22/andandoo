import { TestBed } from '@angular/core/testing';

import { UtilisateurService } from './utilisateur.service';
import { HttpClientModule } from '@angular/common/http';

describe('UtilisateurService', () => {
  let service: UtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
