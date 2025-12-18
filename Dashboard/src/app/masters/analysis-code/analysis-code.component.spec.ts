import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisCodeComponent } from './analysis-code.component';

describe('AnalysisCodeComponent', () => {
  let component: AnalysisCodeComponent;
  let fixture: ComponentFixture<AnalysisCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
