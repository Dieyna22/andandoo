import { TestBed } from '@angular/core/testing';

import { AvisService } from './avis.service';
import { HttpClientModule } from '@angular/common/http';

describe('AvisService', () => {
  let service: AvisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AvisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
