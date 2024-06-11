import { TestBed } from '@angular/core/testing';

import { PersonnelserviceService } from './personnelservice.service';

describe('PersonnelserviceService', () => {
  let service: PersonnelserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
