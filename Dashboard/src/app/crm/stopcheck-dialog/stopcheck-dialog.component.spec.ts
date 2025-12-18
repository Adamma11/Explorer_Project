import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopcheckDialogComponent } from './stopcheck-dialog.component';

describe('StopcheckDialogComponent', () => {
  let component: StopcheckDialogComponent;
  let fixture: ComponentFixture<StopcheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopcheckDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopcheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
