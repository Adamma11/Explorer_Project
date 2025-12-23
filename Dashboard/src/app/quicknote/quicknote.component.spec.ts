import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicknoteComponent } from './quicknote.component';

describe('QuicknoteComponent', () => {
  let component: QuicknoteComponent;
  let fixture: ComponentFixture<QuicknoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuicknoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuicknoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
