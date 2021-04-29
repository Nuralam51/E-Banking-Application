import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInfoComponent } from './register-info.component';

describe('RegisterInfoComponent', () => {
  let component: RegisterInfoComponent;
  let fixture: ComponentFixture<RegisterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
