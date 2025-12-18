import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseStatusComponent } from './new-case-status.component';

describe('NewCaseStatusComponent', () => {
  let component: NewCaseStatusComponent;
  let fixture: ComponentFixture<NewCaseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCaseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
