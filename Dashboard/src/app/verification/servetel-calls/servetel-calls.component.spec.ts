import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServetelCallsComponent } from './servetel-calls.component';

describe('ServetelCallsComponent', () => {
  let component: ServetelCallsComponent;
  let fixture: ComponentFixture<ServetelCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServetelCallsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServetelCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
