import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUploadListComponent } from './batch-upload-list.component';

describe('BatchUploadListComponent', () => {
  let component: BatchUploadListComponent;
  let fixture: ComponentFixture<BatchUploadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchUploadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
