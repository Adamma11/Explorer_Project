import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLhsListComponent } from './update-lhs-list.component';

describe('UpdateLhsListComponent', () => {
  let component: UpdateLhsListComponent;
  let fixture: ComponentFixture<UpdateLhsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLhsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLhsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
