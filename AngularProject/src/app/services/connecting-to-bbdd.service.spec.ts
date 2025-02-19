import { TestBed } from '@angular/core/testing';

import { ConnectingToBbddService } from './connecting-to-bbdd.service';

describe('ConnectingToBbddService', () => {
  let service: ConnectingToBbddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectingToBbddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
