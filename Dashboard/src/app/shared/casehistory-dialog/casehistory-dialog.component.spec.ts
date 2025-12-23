import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasehistoryDialogComponent } from './casehistory-dialog.component';

describe('CasehistoryDialogComponent', () => {
  let component: CasehistoryDialogComponent;
  let fixture: ComponentFixture<CasehistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasehistoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasehistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
