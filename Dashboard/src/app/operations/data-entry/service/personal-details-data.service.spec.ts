import { TestBed } from '@angular/core/testing';

import { PersonalDetailsDataService } from './personal-details-data.service';

describe('PersonalDetailsDataService', () => {
  let service: PersonalDetailsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalDetailsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
