import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterimQcComponent } from './interim-qc.component';

describe('InterimQcComponent', () => {
  let component: InterimQcComponent;
  let fixture: ComponentFixture<InterimQcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterimQcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterimQcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
