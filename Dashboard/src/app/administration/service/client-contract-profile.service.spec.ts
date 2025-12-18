import { TestBed } from '@angular/core/testing';

import { ClientContractProfileService } from './client-contract-profile.service';

describe('ClientContractProfileService', () => {
  let service: ClientContractProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientContractProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
