import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputqcCaseListComponent } from './outputqc-case-list.component';

describe('OutputqcCaseListComponent', () => {
  let component: OutputqcCaseListComponent;
  let fixture: ComponentFixture<OutputqcCaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputqcCaseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputqcCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
