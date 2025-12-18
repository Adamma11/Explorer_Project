import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandradVerbiageListComponent } from './standrad-verbiage-list.component';

describe('StandradVerbiageListComponent', () => {
  let component: StandradVerbiageListComponent;
  let fixture: ComponentFixture<StandradVerbiageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandradVerbiageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandradVerbiageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
