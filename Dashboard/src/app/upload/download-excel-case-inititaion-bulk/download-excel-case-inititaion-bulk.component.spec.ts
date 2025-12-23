import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadExcelCaseInititaionBulkComponent } from './download-excel-case-inititaion-bulk.component';

describe('DownloadExcelCaseInititaionBulkComponent', () => {
  let component: DownloadExcelCaseInititaionBulkComponent;
  let fixture: ComponentFixture<DownloadExcelCaseInititaionBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadExcelCaseInititaionBulkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadExcelCaseInititaionBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
