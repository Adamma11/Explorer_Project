import { TestBed } from '@angular/core/testing';

import { UserSubclientAccessService } from './user-subclient-access.service';

describe('UserSubclientAccessService', () => {
  let service: UserSubclientAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSubclientAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
