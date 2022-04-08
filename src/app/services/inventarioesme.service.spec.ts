import { TestBed } from '@angular/core/testing';

import { InventarioesmeService } from './inventarioesme.service';

describe('InventarioesmeService', () => {
  let service: InventarioesmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioesmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
