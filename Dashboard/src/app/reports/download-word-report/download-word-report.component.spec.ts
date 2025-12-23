import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadWordReportComponent } from './download-word-report.component';

describe('DownloadWordReportComponent', () => {
  let component: DownloadWordReportComponent;
  let fixture: ComponentFixture<DownloadWordReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadWordReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadWordReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
