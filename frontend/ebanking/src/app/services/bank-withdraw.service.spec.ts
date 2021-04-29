import { TestBed } from '@angular/core/testing';

import { BankWithdrawService } from './bank-withdraw.service';

describe('BankWithdrawService', () => {
  let service: BankWithdrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankWithdrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
