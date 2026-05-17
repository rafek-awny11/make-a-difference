import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabelComponent } from './availabel.component';

describe('AvailabelComponent', () => {
  let component: AvailabelComponent;
  let fixture: ComponentFixture<AvailabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
