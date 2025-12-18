import { TestBed } from '@angular/core/testing';

import { StandardVerbiageService } from './standard-verbiage.service';

describe('StandardVerbiageService', () => {
  let service: StandardVerbiageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardVerbiageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
