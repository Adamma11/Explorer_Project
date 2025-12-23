import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsufRejectionComponent } from './insuf-rejection.component';

describe('InsufRejectionComponent', () => {
  let component: InsufRejectionComponent;
  let fixture: ComponentFixture<InsufRejectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsufRejectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsufRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
