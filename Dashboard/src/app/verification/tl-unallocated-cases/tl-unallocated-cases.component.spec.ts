import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlUnallocatedCasesComponent } from './tl-unallocated-cases.component';

describe('TlUnallocatedCasesComponent', () => {
  let component: TlUnallocatedCasesComponent;
  let fixture: ComponentFixture<TlUnallocatedCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlUnallocatedCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TlUnallocatedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
