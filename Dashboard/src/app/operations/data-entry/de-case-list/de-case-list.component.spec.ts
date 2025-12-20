import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeCaseListComponent } from './de-case-list.component';

describe('DeCaseListComponent', () => {
  let component: DeCaseListComponent;
  let fixture: ComponentFixture<DeCaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeCaseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
