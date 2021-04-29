import { TestBed } from '@angular/core/testing';

import { AdminAddBankService } from './admin-add-bank.service';

describe('AdminAddBankService', () => {
  let service: AdminAddBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAddBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
