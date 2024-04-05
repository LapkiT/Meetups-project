import { TestBed } from '@angular/core/testing';

import { MeetupsServicesService } from './meetups-services.service';

describe('MeetupsServicesService', () => {
  let service: MeetupsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetupsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
