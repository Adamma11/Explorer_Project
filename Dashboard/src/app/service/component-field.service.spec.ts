import { TestBed } from '@angular/core/testing';

import { ComponentFieldService } from './component-field.service';

describe('ComponentFieldService', () => {
  let service: ComponentFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
