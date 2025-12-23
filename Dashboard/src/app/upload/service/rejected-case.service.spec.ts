import { TestBed } from '@angular/core/testing';

import { RejectedCaseService } from './rejected-case.service';

describe('RejectedCaseService', () => {
  let service: RejectedCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectedCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
