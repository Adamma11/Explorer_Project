import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentMasterListComponent } from './employment-master-list.component';

describe('EmploymentMasterListComponent', () => {
  let component: EmploymentMasterListComponent;
  let fixture: ComponentFixture<EmploymentMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
