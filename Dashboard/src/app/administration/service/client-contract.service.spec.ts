import { TestBed } from '@angular/core/testing';

import { ClientContractService } from './client-contract.service';

describe('ClientContractService', () => {
  let service: ClientContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
