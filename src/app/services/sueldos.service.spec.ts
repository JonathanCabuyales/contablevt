import { TestBed } from '@angular/core/testing';

import { SueldosService } from './sueldos.service';

describe('SueldosService', () => {
  let service: SueldosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SueldosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
