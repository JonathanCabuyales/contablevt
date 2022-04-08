import { TestBed } from '@angular/core/testing';

import { BdemapaService } from './bdemapa.service';

describe('BdemapaService', () => {
  let service: BdemapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdemapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
