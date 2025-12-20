import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeConfirmDialogComponent } from './de-confirm-dialog.component';

describe('DeConfirmDialogComponent', () => {
  let component: DeConfirmDialogComponent;
  let fixture: ComponentFixture<DeConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
