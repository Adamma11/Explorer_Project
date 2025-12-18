import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCalendarComponent } from './default-calendar.component';

describe('DefaultCalendarComponent', () => {
  let component: DefaultCalendarComponent;
  let fixture: ComponentFixture<DefaultCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
