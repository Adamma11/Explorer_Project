import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisCodeDetailsComponent } from './analysis-code-details.component';

describe('AnalysisCodeDetailsComponent', () => {
  let component: AnalysisCodeDetailsComponent;
  let fixture: ComponentFixture<AnalysisCodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisCodeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
