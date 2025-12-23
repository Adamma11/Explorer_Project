import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInsufListComponent } from './client-insuf-list.component';

describe('ClientInsufListComponent', () => {
  let component: ClientInsufListComponent;
  let fixture: ComponentFixture<ClientInsufListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientInsufListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInsufListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
