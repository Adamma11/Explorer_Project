import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinDetailsComponent } from './pin-details.component';

describe('PinDetailsComponent', () => {
  let component: PinDetailsComponent;
  let fixture: ComponentFixture<PinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
