import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryAllComponent } from './data-entry-all.component';

describe('DataEntryAllComponent', () => {
  let component: DataEntryAllComponent;
  let fixture: ComponentFixture<DataEntryAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEntryAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEntryAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
