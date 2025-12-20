import { TestBed } from '@angular/core/testing';

import { CaseDetailsForDataEntryService } from './case-details-for-data-entry.service';

describe('CaseDetailsForDataEntryService', () => {
  let service: CaseDetailsForDataEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseDetailsForDataEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
