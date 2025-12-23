import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInsufDetailsComponent } from './client-insuf-details.component';

describe('ClientInsufDetailsComponent', () => {
  let component: ClientInsufDetailsComponent;
  let fixture: ComponentFixture<ClientInsufDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientInsufDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInsufDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
