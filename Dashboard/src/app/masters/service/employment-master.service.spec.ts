import { TestBed } from '@angular/core/testing';

import { EmploymentMasterService } from './employment-master.service';

describe('EmploymentMasterService', () => {
  let service: EmploymentMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
