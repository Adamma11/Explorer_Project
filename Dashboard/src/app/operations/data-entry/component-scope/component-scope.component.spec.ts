import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentScopeComponent } from './component-scope.component';

describe('ComponentScopeComponent', () => {
  let component: ComponentScopeComponent;
  let fixture: ComponentFixture<ComponentScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentScopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
