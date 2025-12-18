import { TestBed } from '@angular/core/testing';

import { EducationMasterService } from './education-master.service';

describe('EducationMasterService', () => {
  let service: EducationMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
