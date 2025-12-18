import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypeDetailsComponent } from './analysis-type-details.component';

describe('AnalysisTypeDetailsComponent', () => {
  let component: AnalysisTypeDetailsComponent;
  let fixture: ComponentFixture<AnalysisTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisTypeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
