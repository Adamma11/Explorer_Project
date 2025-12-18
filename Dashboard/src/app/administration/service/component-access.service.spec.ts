import { TestBed } from '@angular/core/testing';

import { ComponentAccessService } from './component-access.service';

describe('ComponentAccessService', () => {
  let service: ComponentAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
