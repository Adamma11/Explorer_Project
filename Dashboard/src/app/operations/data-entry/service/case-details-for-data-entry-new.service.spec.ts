import { TestBed } from '@angular/core/testing';

import { CaseDetailsForDataEntryNewService } from './case-details-for-data-entry-new.service';

describe('CaseDetailsForDataEntryNewService', () => {
  let service: CaseDetailsForDataEntryNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseDetailsForDataEntryNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
