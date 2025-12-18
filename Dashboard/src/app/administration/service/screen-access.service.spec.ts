import { TestBed } from '@angular/core/testing';

import { ScreenAccessService } from './screen-access.service';

describe('ScreenAccessService', () => {
  let service: ScreenAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
