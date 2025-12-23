import { TestBed } from '@angular/core/testing';

import { SharedFieldService } from './shared-field.service';

describe('SharedFieldService', () => {
  let service: SharedFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
