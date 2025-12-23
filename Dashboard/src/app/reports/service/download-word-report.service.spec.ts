import { TestBed } from '@angular/core/testing';

import { DownloadWordReportService } from './download-word-report.service';

describe('DownloadWordReportService', () => {
  let service: DownloadWordReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadWordReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
