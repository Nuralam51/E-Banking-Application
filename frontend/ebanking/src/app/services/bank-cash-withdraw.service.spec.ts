import { TestBed } from '@angular/core/testing';

import { BankCashWithdrawService } from './bank-cash-withdraw.service';

describe('BankCashWithdrawService', () => {
  let service: BankCashWithdrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankCashWithdrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
