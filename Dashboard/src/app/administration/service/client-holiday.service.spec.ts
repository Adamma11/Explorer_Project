import { TestBed } from '@angular/core/testing';

import { ClientHolidayService } from './client-holiday.service';

describe('ClientHolidayService', () => {
  let service: ClientHolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientHolidayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
