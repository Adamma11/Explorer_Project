import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContractDetailsComponent } from './client-contract-details.component';

describe('ClientContractDetailsComponent', () => {
  let component: ClientContractDetailsComponent;
  let fixture: ComponentFixture<ClientContractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientContractDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
