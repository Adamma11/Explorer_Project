import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitiateCheckComponent } from './reinitiate-check.component';

describe('ReinitiateCheckComponent', () => {
  let component: ReinitiateCheckComponent;
  let fixture: ComponentFixture<ReinitiateCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinitiateCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinitiateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
