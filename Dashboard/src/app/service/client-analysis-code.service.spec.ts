import { TestBed } from '@angular/core/testing';

import { ClientAnalysisCodeService } from './client-analysis-code.service';

describe('ClientAnalysisCodeService', () => {
  let service: ClientAnalysisCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAnalysisCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
