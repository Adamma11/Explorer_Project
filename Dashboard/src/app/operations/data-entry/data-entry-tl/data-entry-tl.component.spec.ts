import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryTlComponent } from './data-entry-tl.component';

describe('DataEntryTlComponent', () => {
  let component: DataEntryTlComponent;
  let fixture: ComponentFixture<DataEntryTlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEntryTlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEntryTlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
