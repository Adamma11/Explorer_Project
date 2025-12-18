import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentMasterDetailsComponent } from './employment-master-details.component';

describe('EmploymentMasterDetailsComponent', () => {
  let component: EmploymentMasterDetailsComponent;
  let fixture: ComponentFixture<EmploymentMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentMasterDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
