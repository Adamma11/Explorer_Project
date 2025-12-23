import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystComponentVerificationComponent } from './analyst-component-verification.component';

describe('AnalystComponentVerificationComponent', () => {
  let component: AnalystComponentVerificationComponent;
  let fixture: ComponentFixture<AnalystComponentVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalystComponentVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystComponentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
