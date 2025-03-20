import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NooraniPrimerComponent } from './noorani-primer.component';

describe('NooraniPrimerComponent', () => {
  let component: NooraniPrimerComponent;
  let fixture: ComponentFixture<NooraniPrimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NooraniPrimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NooraniPrimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
