import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompoundBoardContentComponent } from './add-compound-board-content.component';

describe('AddCompoundBoardContentComponent', () => {
  let component: AddCompoundBoardContentComponent;
  let fixture: ComponentFixture<AddCompoundBoardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCompoundBoardContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompoundBoardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
