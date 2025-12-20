import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputqcComponentListComponent } from './inputqc-component-list.component';

describe('InputqcComponentListComponent', () => {
  let component: InputqcComponentListComponent;
  let fixture: ComponentFixture<InputqcComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputqcComponentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputqcComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
