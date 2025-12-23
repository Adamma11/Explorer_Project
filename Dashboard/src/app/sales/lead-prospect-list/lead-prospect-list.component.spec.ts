import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadProspectListComponent } from './lead-prospect-list.component';

describe('LeadProspectListComponent', () => {
  let component: LeadProspectListComponent;
  let fixture: ComponentFixture<LeadProspectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadProspectListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadProspectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
