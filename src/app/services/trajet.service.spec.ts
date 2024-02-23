import { TestBed } from '@angular/core/testing';

import { TrajetService } from './trajet.service';
import { HttpClientModule } from '@angular/common/http';

describe('TrajetService', () => {
  let service: TrajetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TrajetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
