import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationMasterListComponent } from './education-master-list.component';

describe('EducationMasterListComponent', () => {
  let component: EducationMasterListComponent;
  let fixture: ComponentFixture<EducationMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
