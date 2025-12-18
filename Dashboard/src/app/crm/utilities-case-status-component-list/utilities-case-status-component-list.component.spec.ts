import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiesCaseStatusComponentListComponent } from './utilities-case-status-component-list.component';

describe('UtilitiesCaseStatusComponentListComponent', () => {
  let component: UtilitiesCaseStatusComponentListComponent;
  let fixture: ComponentFixture<UtilitiesCaseStatusComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilitiesCaseStatusComponentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilitiesCaseStatusComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
