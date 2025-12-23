import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystListOfChecksComponent } from './analyst-list-of-checks.component';

describe('AnalystListOfChecksComponent', () => {
  let component: AnalystListOfChecksComponent;
  let fixture: ComponentFixture<AnalystListOfChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalystListOfChecksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystListOfChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
