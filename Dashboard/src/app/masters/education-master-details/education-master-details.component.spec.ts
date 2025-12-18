import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationMasterDetailsComponent } from './education-master-details.component';

describe('EducationMasterDetailsComponent', () => {
  let component: EducationMasterDetailsComponent;
  let fixture: ComponentFixture<EducationMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationMasterDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
