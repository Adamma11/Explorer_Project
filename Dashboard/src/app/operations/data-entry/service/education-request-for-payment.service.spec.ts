import { TestBed } from '@angular/core/testing';

import { EducationRequestForPaymentService } from './education-request-for-payment.service';

describe('EducationRequestForPaymentService', () => {
  let service: EducationRequestForPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationRequestForPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
