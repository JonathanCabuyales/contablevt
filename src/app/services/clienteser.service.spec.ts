import { TestBed } from '@angular/core/testing';

import { ClienteserService } from './clienteser.service';

describe('ClienteserService', () => {
  let service: ClienteserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
