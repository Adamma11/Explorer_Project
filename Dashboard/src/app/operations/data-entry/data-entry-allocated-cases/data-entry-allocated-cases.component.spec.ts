import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryAllocatedCasesComponent } from './data-entry-allocated-cases.component';

describe('DataEntryAllocatedCasesComponent', () => {
  let component: DataEntryAllocatedCasesComponent;
  let fixture: ComponentFixture<DataEntryAllocatedCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEntryAllocatedCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEntryAllocatedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
