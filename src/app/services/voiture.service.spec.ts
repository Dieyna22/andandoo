import { TestBed } from '@angular/core/testing';

import { VoitureService } from './voiture.service';
import { HttpClientModule } from '@angular/common/http';

describe('VoitureService', () => {
  let service: VoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(VoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
