import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingUploadBatchListComponent } from './pending-upload-batch-list.component';

describe('PendingUploadBatchListComponent', () => {
  let component: PendingUploadBatchListComponent;
  let fixture: ComponentFixture<PendingUploadBatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingUploadBatchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingUploadBatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
