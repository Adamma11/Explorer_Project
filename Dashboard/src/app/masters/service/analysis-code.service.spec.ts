import { TestBed } from '@angular/core/testing';

import { AnalysisCodeService } from './analysis-code.service';

describe('AnalysisCodeService', () => {
  let service: AnalysisCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
