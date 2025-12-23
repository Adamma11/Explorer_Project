import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropBoxComponent } from './drop-box.component';

describe('DropBoxComponent', () => {
  let component: DropBoxComponent;
  let fixture: ComponentFixture<DropBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
