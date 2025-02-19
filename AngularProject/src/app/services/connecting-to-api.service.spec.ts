import { TestBed } from '@angular/core/testing';

import { ConnectingToApiService } from './connecting-to-api.service';

describe('ConnectingToApiService', () => {
  let service: ConnectingToApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectingToApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
