import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportChecksComponent } from './export-checks.component';

describe('ExportChecksComponent', () => {
  let component: ExportChecksComponent;
  let fixture: ComponentFixture<ExportChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportChecksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
