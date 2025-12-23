import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputqcAllocationComponent } from './outputqc-allocation.component';

describe('OutputqcAllocationComponent', () => {
  let component: OutputqcAllocationComponent;
  let fixture: ComponentFixture<OutputqcAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputqcAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputqcAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
