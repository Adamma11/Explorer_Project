import { TestBed } from '@angular/core/testing';

import { EmailCandidateDataService } from './email-candidate-data.service';

describe('EmailCandidateDataService', () => {
  let service: EmailCandidateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailCandidateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
