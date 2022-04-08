import { TestBed } from '@angular/core/testing';

import { CatastrosService } from './catastros.service';

describe('CatastrosService', () => {
  let service: CatastrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatastrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
