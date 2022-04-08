import { TestBed } from '@angular/core/testing';

import { MaximumService } from './maximum.service';

describe('MaximumService', () => {
  let service: MaximumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaximumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
