import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPdfComponentListComponent } from './download-pdf-component-list.component';

describe('DownloadPdfComponentListComponent', () => {
  let component: DownloadPdfComponentListComponent;
  let fixture: ComponentFixture<DownloadPdfComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadPdfComponentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadPdfComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
