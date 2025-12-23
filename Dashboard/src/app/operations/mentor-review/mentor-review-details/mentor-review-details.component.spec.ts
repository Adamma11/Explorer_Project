import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorReviewDetailsComponent } from './mentor-review-details.component';

describe('MentorReviewDetailsComponent', () => {
  let component: MentorReviewDetailsComponent;
  let fixture: ComponentFixture<MentorReviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorReviewDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorReviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
