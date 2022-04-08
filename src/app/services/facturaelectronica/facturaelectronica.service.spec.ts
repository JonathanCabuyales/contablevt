import { TestBed } from '@angular/core/testing';

import { FacturaelectronicaService } from './facturaelectronica.service';

describe('FacturaelectronicaService', () => {
  let service: FacturaelectronicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaelectronicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
