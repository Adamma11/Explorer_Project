import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsDataEntryComponent } from './personal-details-data-entry.component';

describe('PersonalDetailsDataEntryComponent', () => {
  let component: PersonalDetailsDataEntryComponent;
  let fixture: ComponentFixture<PersonalDetailsDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDetailsDataEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDetailsDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
