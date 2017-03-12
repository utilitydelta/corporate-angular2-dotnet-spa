import { TestBed, inject } from '@angular/core/testing';

import { BackendCommsService } from './backend-comms.service';

describe('BackendCommsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendCommsService]
    });
  });

  it('should ...', inject([BackendCommsService], (service: BackendCommsService) => {
    expect(service).toBeTruthy();
  }));
});
