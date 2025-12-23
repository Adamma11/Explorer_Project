import { TestBed } from '@angular/core/testing';

import { UserVendorAccessService } from './user-vendor-access.service';

describe('UserVendorAccessService', () => {
  let service: UserVendorAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserVendorAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
