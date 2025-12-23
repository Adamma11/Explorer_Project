import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStatusPopupComponent } from './case-status-popup.component';

describe('CaseStatusPopupComponent', () => {
  let component: CaseStatusPopupComponent;
  let fixture: ComponentFixture<CaseStatusPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseStatusPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
