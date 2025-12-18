import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCaseComponent } from './delete-case.component';

describe('DeleteCaseComponent', () => {
  let component: DeleteCaseComponent;
  let fixture: ComponentFixture<DeleteCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
