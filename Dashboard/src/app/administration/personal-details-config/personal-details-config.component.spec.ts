import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsConfigComponent } from './personal-details-config.component';

describe('PersonalDetailsConfigComponent', () => {
  let component: PersonalDetailsConfigComponent;
  let fixture: ComponentFixture<PersonalDetailsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDetailsConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDetailsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
