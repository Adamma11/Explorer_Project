import { TestBed } from '@angular/core/testing';

import { EmploymentCourierDetailsService } from './employment-courier-details.service';

describe('EmploymentCourierDetailsService', () => {
  let service: EmploymentCourierDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentCourierDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
