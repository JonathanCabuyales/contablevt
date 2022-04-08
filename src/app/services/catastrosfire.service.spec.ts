import { TestBed } from '@angular/core/testing';

import { CatastrosfireService } from './catastrosfire.service';

describe('CatastrosfireService', () => {
  let service: CatastrosfireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatastrosfireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
