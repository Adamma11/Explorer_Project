import { TestBed } from '@angular/core/testing';

import { AnalysisTypeService } from './analysis-type.service';

describe('AnalysisTypeService', () => {
  let service: AnalysisTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
