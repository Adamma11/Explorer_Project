import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorReviewListComponent } from './mentor-review-list.component';

describe('MentorReviewListComponent', () => {
  let component: MentorReviewListComponent;
  let fixture: ComponentFixture<MentorReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorReviewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
