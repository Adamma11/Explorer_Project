import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseStatusReviewComponent } from './new-case-status-review.component';

describe('NewCaseStatusReviewComponent', () => {
  let component: NewCaseStatusReviewComponent;
  let fixture: ComponentFixture<NewCaseStatusReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseStatusReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCaseStatusReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
