import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLhsDetailsComponent } from './update-lhs-details.component';

describe('UpdateLhsDetailsComponent', () => {
  let component: UpdateLhsDetailsComponent;
  let fixture: ComponentFixture<UpdateLhsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLhsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLhsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
