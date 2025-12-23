import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnallocatedChecksComponent } from './unallocated-checks.component';

describe('UnallocatedChecksComponent', () => {
  let component: UnallocatedChecksComponent;
  let fixture: ComponentFixture<UnallocatedChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnallocatedChecksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnallocatedChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
