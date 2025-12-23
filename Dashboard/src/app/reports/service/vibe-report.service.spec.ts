import { TestBed } from '@angular/core/testing';

import { VibeReportService } from './vibe-report.service';

describe('VibeReportService', () => {
  let service: VibeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VibeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
