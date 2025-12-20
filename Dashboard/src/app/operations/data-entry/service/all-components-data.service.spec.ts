import { TestBed } from '@angular/core/testing';

import { AllComponentsDataService } from './all-components-data.service';

describe('AllComponentsDataService', () => {
  let service: AllComponentsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllComponentsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
