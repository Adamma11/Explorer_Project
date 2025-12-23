import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpValidationDialogComponent } from './otp-validation-dialog.component';

describe('OtpValidationDialogComponent', () => {
  let component: OtpValidationDialogComponent;
  let fixture: ComponentFixture<OtpValidationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpValidationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpValidationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
