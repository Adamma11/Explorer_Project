import { TestBed } from '@angular/core/testing';

import { BranchAccessService } from './branch-access.service';

describe('BranchAccessService', () => {
  let service: BranchAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
