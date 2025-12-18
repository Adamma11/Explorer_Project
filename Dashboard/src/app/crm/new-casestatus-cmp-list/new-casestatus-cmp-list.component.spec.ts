import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCasestatusCmpListComponent } from './new-casestatus-cmp-list.component';

describe('NewCasestatusCmpListComponent', () => {
  let component: NewCasestatusCmpListComponent;
  let fixture: ComponentFixture<NewCasestatusCmpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCasestatusCmpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCasestatusCmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
