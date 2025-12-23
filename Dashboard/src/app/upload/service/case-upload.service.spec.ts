import { TestBed } from '@angular/core/testing';

import { CaseUploadService } from './case-upload.service';

describe('CaseUploadService', () => {
  let service: CaseUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
