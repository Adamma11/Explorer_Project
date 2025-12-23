import { TestBed } from '@angular/core/testing';

import { DashboardAccessService } from './dashboard-access.service';

describe('DashboardAccessService', () => {
  let service: DashboardAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
