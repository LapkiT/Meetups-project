import { TestBed } from '@angular/core/testing';

import { UserLogRegService } from './user-log-reg.service';

describe('UserLogRegService', () => {
  let service: UserLogRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
