import { TestBed } from '@angular/core/testing';

import { ClientContractComponentService } from './client-contract-component.service';

describe('ClientContractComponentService', () => {
  let service: ClientContractComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientContractComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
