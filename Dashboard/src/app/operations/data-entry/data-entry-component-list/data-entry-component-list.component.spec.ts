import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryComponentListComponent } from './data-entry-component-list.component';

describe('DataEntryComponentListComponent', () => {
  let component: DataEntryComponentListComponent;
  let fixture: ComponentFixture<DataEntryComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEntryComponentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEntryComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
