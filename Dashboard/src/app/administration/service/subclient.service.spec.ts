import { TestBed } from '@angular/core/testing';

import { SubclientService } from './subclient.service';

describe('SubclientService', () => {
  let service: SubclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
