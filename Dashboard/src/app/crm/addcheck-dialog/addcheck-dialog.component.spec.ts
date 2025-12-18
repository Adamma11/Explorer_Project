import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcheckDialogComponent } from './addcheck-dialog.component';

describe('AddcheckDialogComponent', () => {
  let component: AddcheckDialogComponent;
  let fixture: ComponentFixture<AddcheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcheckDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
