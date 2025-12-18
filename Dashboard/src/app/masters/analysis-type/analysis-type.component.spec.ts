import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypeComponent } from './analysis-type.component';

describe('AnalysisTypeComponent', () => {
  let component: AnalysisTypeComponent;
  let fixture: ComponentFixture<AnalysisTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
