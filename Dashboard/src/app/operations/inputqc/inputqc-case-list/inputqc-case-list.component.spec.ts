import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputqcCaseListComponent } from './inputqc-case-list.component';

describe('InputqcCaseListComponent', () => {
  let component: InputqcCaseListComponent;
  let fixture: ComponentFixture<InputqcCaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputqcCaseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputqcCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
