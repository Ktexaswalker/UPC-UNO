import { TestBed } from '@angular/core/testing';

import { AutentificacioService } from './autentificacio.service';

describe('AutentificacioService', () => {
  let service: AutentificacioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentificacioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
