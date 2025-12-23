import { TestBed } from '@angular/core/testing';

import { ValidateUserService } from './validate-user.service';

describe('ValidateUserService', () => {
  let service: ValidateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
