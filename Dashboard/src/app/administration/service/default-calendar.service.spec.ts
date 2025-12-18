import { TestBed } from '@angular/core/testing';

import { DefaultCalendarService } from './default-calendar.service';

describe('DefaultCalendarService', () => {
  let service: DefaultCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
