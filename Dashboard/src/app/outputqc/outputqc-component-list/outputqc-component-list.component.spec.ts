import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputqcComponentListComponent } from './outputqc-component-list.component';

describe('OutputqcComponentListComponent', () => {
  let component: OutputqcComponentListComponent;
  let fixture: ComponentFixture<OutputqcComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputqcComponentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputqcComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
