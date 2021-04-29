import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddBankComponent } from './admin-add-bank.component';

describe('AdminAddBankComponent', () => {
  let component: AdminAddBankComponent;
  let fixture: ComponentFixture<AdminAddBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
