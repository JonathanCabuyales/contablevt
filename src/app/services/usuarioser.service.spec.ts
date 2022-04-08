import { TestBed } from '@angular/core/testing';

import { UsuarioserService } from './usuarioser.service';

describe('UsuarioserService', () => {
  let service: UsuarioserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
