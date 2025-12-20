import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsInputqcComponent } from './personal-details-inputqc.component';

describe('PersonalDetailsInputqcComponent', () => {
  let component: PersonalDetailsInputqcComponent;
  let fixture: ComponentFixture<PersonalDetailsInputqcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDetailsInputqcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDetailsInputqcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
