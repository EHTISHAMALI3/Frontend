import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLettersComponent } from './individual-letters.component';

describe('IndividualLettersComponent', () => {
  let component: IndividualLettersComponent;
  let fixture: ComponentFixture<IndividualLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualLettersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
