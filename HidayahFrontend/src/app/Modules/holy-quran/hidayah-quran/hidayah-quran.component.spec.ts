import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HidayahQuranComponent } from './hidayah-quran.component';

describe('HidayahQuranComponent', () => {
  let component: HidayahQuranComponent;
  let fixture: ComponentFixture<HidayahQuranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HidayahQuranComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HidayahQuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
