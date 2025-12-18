import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCodesListComponent } from './color-codes-list.component';

describe('ColorCodesListComponent', () => {
  let component: ColorCodesListComponent;
  let fixture: ComponentFixture<ColorCodesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorCodesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorCodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
