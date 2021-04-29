import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOtpComponent } from './register-otp.component';

describe('RegisterOtpComponent', () => {
  let component: RegisterOtpComponent;
  let fixture: ComponentFixture<RegisterOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
