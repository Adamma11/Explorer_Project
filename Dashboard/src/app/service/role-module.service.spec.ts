import { TestBed } from '@angular/core/testing';

import { RoleModuleService } from './role-module.service';

describe('RoleModuleService', () => {
  let service: RoleModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
