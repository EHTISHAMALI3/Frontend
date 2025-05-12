import { TestBed } from '@angular/core/testing';

import { TranscriptionServiceService } from './transcription-service.service';

describe('TranscriptionServiceService', () => {
  let service: TranscriptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscriptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
