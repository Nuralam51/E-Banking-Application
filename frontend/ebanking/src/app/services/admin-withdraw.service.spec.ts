import { TestBed } from '@angular/core/testing';

import { AdminWithdrawService } from './admin-withdraw.service';

describe('AdminWithdrawService', () => {
  let service: AdminWithdrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWithdrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
