import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadExcelTemplateComponent } from './download-excel-template.component';

describe('DownloadExcelTemplateComponent', () => {
  let component: DownloadExcelTemplateComponent;
  let fixture: ComponentFixture<DownloadExcelTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadExcelTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadExcelTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
