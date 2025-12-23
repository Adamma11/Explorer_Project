import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhsPopupComponent } from './lhs-popup.component';

describe('LhsPopupComponent', () => {
  let component: LhsPopupComponent;
  let fixture: ComponentFixture<LhsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
