import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDataEntryComponent } from './component-data-entry.component';

describe('ComponentDataEntryComponent', () => {
  let component: ComponentDataEntryComponent;
  let fixture: ComponentFixture<ComponentDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentDataEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
