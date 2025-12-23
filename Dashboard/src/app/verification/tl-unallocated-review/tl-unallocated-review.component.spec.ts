import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlUnallocatedReviewComponent } from './tl-unallocated-review.component';

describe('TlUnallocatedReviewComponent', () => {
  let component: TlUnallocatedReviewComponent;
  let fixture: ComponentFixture<TlUnallocatedReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlUnallocatedReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TlUnallocatedReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
