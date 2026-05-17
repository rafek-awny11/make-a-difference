import { TestBed } from '@angular/core/testing';

import { AllstudentService } from './allstudent.service';

describe('AllstudentService', () => {
  let service: AllstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
