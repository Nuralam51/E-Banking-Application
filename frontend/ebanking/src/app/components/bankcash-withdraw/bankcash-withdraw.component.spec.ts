import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankcashWithdrawComponent } from './bankcash-withdraw.component';

describe('BankcashWithdrawComponent', () => {
  let component: BankcashWithdrawComponent;
  let fixture: ComponentFixture<BankcashWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankcashWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankcashWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
