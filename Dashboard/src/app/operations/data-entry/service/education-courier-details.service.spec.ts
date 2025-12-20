import { TestBed } from '@angular/core/testing';

import { EducationCourierDetailsService } from './education-courier-details.service';

describe('EducationCourierDetailsService', () => {
  let service: EducationCourierDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationCourierDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
