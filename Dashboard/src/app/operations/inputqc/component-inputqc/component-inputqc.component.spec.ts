import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInputqcComponent } from './component-inputqc.component';

describe('ComponentInputqcComponent', () => {
  let component: ComponentInputqcComponent;
  let fixture: ComponentFixture<ComponentInputqcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentInputqcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentInputqcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
