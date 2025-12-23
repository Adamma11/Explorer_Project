import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantVerifyComponent } from './instant-verify.component';

describe('InstantVerifyComponent', () => {
  let component: InstantVerifyComponent;
  let fixture: ComponentFixture<InstantVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstantVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstantVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
