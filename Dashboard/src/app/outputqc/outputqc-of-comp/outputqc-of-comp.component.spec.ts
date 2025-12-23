import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputqcOfCompComponent } from './outputqc-of-comp.component';

describe('OutputqcOfCompComponent', () => {
  let component: OutputqcOfCompComponent;
  let fixture: ComponentFixture<OutputqcOfCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputqcOfCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputqcOfCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
