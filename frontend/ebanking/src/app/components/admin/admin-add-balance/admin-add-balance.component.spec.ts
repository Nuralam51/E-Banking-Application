import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddBalanceComponent } from './admin-add-balance.component';

describe('AdminAddBalanceComponent', () => {
  let component: AdminAddBalanceComponent;
  let fixture: ComponentFixture<AdminAddBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
