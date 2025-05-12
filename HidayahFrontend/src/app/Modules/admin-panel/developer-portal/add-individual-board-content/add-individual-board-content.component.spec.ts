import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndividualBoardContentComponent } from './add-individual-board-content.component';

describe('AddIndividualBoardContentComponent', () => {
  let component: AddIndividualBoardContentComponent;
  let fixture: ComponentFixture<AddIndividualBoardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIndividualBoardContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIndividualBoardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
