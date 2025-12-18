import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFieldHistoryComponent } from './check-field-history.component';

describe('CheckFieldHistoryComponent', () => {
  let component: CheckFieldHistoryComponent;
  let fixture: ComponentFixture<CheckFieldHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckFieldHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckFieldHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
