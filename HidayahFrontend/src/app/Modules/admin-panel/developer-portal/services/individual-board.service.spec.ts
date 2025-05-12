import { TestBed } from '@angular/core/testing';

import { IndividualBoardService } from './individual-board.service';

describe('IndividualBoardService', () => {
  let service: IndividualBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
