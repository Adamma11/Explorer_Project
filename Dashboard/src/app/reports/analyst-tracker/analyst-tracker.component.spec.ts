import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystTrackerComponent } from './analyst-tracker.component';

describe('AnalystTrackerComponent', () => {
  let component: AnalystTrackerComponent;
  let fixture: ComponentFixture<AnalystTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalystTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
