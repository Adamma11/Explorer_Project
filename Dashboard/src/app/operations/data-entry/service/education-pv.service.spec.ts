import { TestBed } from '@angular/core/testing';

import { EducationPvService } from './education-pv.service';

describe('EducationPvService', () => {
  let service: EducationPvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationPvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
