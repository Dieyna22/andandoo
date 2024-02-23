import { TestBed } from '@angular/core/testing';

import { ZoneService } from './zone.service';
import { HttpClientModule } from '@angular/common/http';

describe('ZoneService', () => {
  let service: ZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
