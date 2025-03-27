import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HidayahHomeComponent } from './hidayah-home.component';

describe('HidayahHomeComponent', () => {
  let component: HidayahHomeComponent;
  let fixture: ComponentFixture<HidayahHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HidayahHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HidayahHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
