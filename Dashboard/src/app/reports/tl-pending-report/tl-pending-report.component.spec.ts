import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlPendingReportComponent } from './tl-pending-report.component';

describe('TlPendingReportComponent', () => {
  let component: TlPendingReportComponent;
  let fixture: ComponentFixture<TlPendingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlPendingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TlPendingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
