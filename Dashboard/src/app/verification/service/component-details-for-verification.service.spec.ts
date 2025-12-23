import { TestBed } from '@angular/core/testing';

import { ComponentDetailsForVerificationService } from './component-details-for-verification.service';

describe('ComponentDetailsForVerificationService', () => {
  let service: ComponentDetailsForVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentDetailsForVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
