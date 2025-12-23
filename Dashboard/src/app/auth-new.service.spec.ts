import { TestBed } from '@angular/core/testing';

import { AuthNewService } from './auth-new.service';

describe('AuthNewService', () => {
  let service: AuthNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
