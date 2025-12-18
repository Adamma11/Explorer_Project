import { TestBed } from '@angular/core/testing';

import { UserBranchAccessService } from './user-branch-access.service';

describe('UserBranchAccessService', () => {
  let service: UserBranchAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBranchAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
