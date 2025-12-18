import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclientDetailsComponent } from './subclient-details.component';

describe('SubclientDetailsComponent', () => {
  let component: SubclientDetailsComponent;
  let fixture: ComponentFixture<SubclientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubclientDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubclientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
