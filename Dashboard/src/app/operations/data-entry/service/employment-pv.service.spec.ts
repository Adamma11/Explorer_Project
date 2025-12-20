import { TestBed } from '@angular/core/testing';

import { EmploymentPvService } from './employment-pv.service';

describe('EmploymentPvService', () => {
  let service: EmploymentPvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentPvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
