import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStatusComponentListComponent } from './case-status-component-list.component';

describe('CaseStatusComponentListComponent', () => {
  let component: CaseStatusComponentListComponent;
  let fixture: ComponentFixture<CaseStatusComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseStatusComponentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStatusComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
