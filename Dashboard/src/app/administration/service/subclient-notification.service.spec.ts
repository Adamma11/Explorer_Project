import { TestBed } from '@angular/core/testing';

import { SubclientNotificationService } from './subclient-notification.service';

describe('SubclientNotificationService', () => {
  let service: SubclientNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubclientNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
