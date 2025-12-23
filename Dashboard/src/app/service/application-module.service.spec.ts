import { TestBed } from '@angular/core/testing';

import { ApplicationModuleService } from './application-module.service';

describe('ApplicationModuleService', () => {
  let service: ApplicationModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
