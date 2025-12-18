import { TestBed } from '@angular/core/testing';

import { ClientContractPackageService } from './client-contract-package.service';

describe('ClientContractPackageService', () => {
  let service: ClientContractPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientContractPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
