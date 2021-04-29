import { TestBed } from '@angular/core/testing';

import { AdminCardService } from './admin-card.service';

describe('AdminCardService', () => {
  let service: AdminCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
