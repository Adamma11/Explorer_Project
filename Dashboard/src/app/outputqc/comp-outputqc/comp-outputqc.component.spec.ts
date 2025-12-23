import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOutputqcComponent } from './comp-outputqc.component';

describe('CompOutputqcComponent', () => {
  let component: CompOutputqcComponent;
  let fixture: ComponentFixture<CompOutputqcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompOutputqcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompOutputqcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
