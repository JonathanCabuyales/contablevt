import { TestBed } from '@angular/core/testing';

import { LameService } from './lame.service';

describe('LameService', () => {
  let service: LameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
