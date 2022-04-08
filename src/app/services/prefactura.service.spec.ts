import { TestBed } from '@angular/core/testing';

import { PrefacturaService } from './prefactura.service';

describe('PrefacturaService', () => {
  let service: PrefacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
