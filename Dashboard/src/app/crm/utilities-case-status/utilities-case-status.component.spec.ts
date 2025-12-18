import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiesCaseStatusComponent } from './utilities-case-status.component';

describe('UtilitiesCaseStatusComponent', () => {
  let component: UtilitiesCaseStatusComponent;
  let fixture: ComponentFixture<UtilitiesCaseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilitiesCaseStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilitiesCaseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
