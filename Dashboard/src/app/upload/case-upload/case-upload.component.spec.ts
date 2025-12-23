import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseUploadComponent } from './case-upload.component';

describe('CaseUploadComponent', () => {
  let component: CaseUploadComponent;
  let fixture: ComponentFixture<CaseUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
