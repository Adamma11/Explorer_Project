import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandradVerbiageDetailsComponent } from './standrad-verbiage-details.component';

describe('StandradVerbiageDetailsComponent', () => {
  let component: StandradVerbiageDetailsComponent;
  let fixture: ComponentFixture<StandradVerbiageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandradVerbiageDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandradVerbiageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
