import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundLettersComponent } from './compound-letters.component';

describe('CompoundLettersComponent', () => {
  let component: CompoundLettersComponent;
  let fixture: ComponentFixture<CompoundLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundLettersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
