import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeBoardComponent } from './practice-board.component';

describe('PracticeBoardComponent', () => {
  let component: PracticeBoardComponent;
  let fixture: ComponentFixture<PracticeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
