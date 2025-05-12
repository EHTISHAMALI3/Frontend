import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUsersImportComponent } from './bulk-users-import.component';

describe('BulkUsersImportComponent', () => {
  let component: BulkUsersImportComponent;
  let fixture: ComponentFixture<BulkUsersImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkUsersImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUsersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
