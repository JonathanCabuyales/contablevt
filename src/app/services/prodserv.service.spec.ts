import { TestBed } from '@angular/core/testing';

import { ProdservService } from './prodserv.service';

describe('ProdservService', () => {
  let service: ProdservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
