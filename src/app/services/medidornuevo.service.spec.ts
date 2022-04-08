import { TestBed } from '@angular/core/testing';

import { MedidornuevoService } from './medidornuevo.service';

describe('MedidornuevoService', () => {
  let service: MedidornuevoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedidornuevoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
