import { TestBed } from '@angular/core/testing';

import { AdminAddBalanceService } from './admin-add-balance.service';

describe('AdminAddBalanceService', () => {
  let service: AdminAddBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAddBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
