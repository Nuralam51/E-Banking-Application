import { TestBed } from '@angular/core/testing';

import { MobileWithdrawService } from '././mobile-withdraw.service';

describe('MobileWithdrawService', () => {
  let service: MobileWithdrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileWithdrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
