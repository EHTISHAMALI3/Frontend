import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolyQuranComponent } from './holy-quran.component';

describe('HolyQuranComponent', () => {
  let component: HolyQuranComponent;
  let fixture: ComponentFixture<HolyQuranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolyQuranComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolyQuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
