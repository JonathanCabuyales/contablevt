import { TestBed } from '@angular/core/testing';

import { DepreciacionService } from './depreciacion.service';

describe('DepreciacionService', () => {
  let service: DepreciacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepreciacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
