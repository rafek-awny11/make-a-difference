import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAttendanceComponent } from './details-attendance.component';

describe('DetailsAttendanceComponent', () => {
  let component: DetailsAttendanceComponent;
  let fixture: ComponentFixture<DetailsAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
