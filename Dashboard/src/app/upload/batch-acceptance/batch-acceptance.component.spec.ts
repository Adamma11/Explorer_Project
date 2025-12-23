import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAcceptanceComponent } from './batch-acceptance.component';

describe('BatchAcceptanceComponent', () => {
  let component: BatchAcceptanceComponent;
  let fixture: ComponentFixture<BatchAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchAcceptanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
