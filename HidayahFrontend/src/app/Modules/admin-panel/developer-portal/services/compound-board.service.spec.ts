import { TestBed } from '@angular/core/testing';

import { CompoundBoardService } from './compound-board.service';

describe('CompoundBoardService', () => {
  let service: CompoundBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompoundBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
