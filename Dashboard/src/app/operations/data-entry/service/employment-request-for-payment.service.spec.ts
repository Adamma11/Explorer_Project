import { TestBed } from '@angular/core/testing';

import { EmploymentRequestForPaymentService } from './employment-request-for-payment.service';

describe('EmploymentRequestForPaymentService', () => {
  let service: EmploymentRequestForPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentRequestForPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
