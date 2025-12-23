import { TestBed } from '@angular/core/testing';

import { BatchFileUploadService } from './batch-file-upload.service';

describe('BatchFileUploadService', () => {
  let service: BatchFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
