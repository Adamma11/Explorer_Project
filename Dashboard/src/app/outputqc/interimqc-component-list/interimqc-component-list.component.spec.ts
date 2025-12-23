import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterimqcComponentListComponent } from './interimqc-component-list.component';

describe('InterimqcComponentListComponent', () => {
  let component: InterimqcComponentListComponent;
  let fixture: ComponentFixture<InterimqcComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterimqcComponentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterimqcComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
