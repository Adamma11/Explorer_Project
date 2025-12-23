import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyInsufListComponent } from './scrutiny-insuf-list.component';

describe('ScrutinyInsufListComponent', () => {
  let component: ScrutinyInsufListComponent;
  let fixture: ComponentFixture<ScrutinyInsufListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrutinyInsufListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrutinyInsufListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
