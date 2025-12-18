import { TestBed } from '@angular/core/testing';

import { ColorMasterService } from './color-master.service';

describe('ColorMasterService', () => {
  let service: ColorMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
