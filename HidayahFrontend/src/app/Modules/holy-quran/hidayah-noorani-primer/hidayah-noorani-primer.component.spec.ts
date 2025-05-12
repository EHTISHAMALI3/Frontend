import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HidayahNooraniPrimerComponent } from './hidayah-noorani-primer.component';

describe('HidayahNooraniPrimerComponent', () => {
  let component: HidayahNooraniPrimerComponent;
  let fixture: ComponentFixture<HidayahNooraniPrimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HidayahNooraniPrimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HidayahNooraniPrimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
