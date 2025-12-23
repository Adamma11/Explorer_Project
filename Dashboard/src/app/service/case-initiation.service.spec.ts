import { TestBed } from '@angular/core/testing';

import { CaseInitiationService } from './case-initiation.service';

describe('CaseInitiationService', () => {
  let service: CaseInitiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseInitiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
