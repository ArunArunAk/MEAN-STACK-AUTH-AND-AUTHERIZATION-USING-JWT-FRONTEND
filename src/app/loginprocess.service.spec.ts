import { TestBed } from '@angular/core/testing';

import { LoginprocessService } from './loginprocess.service';

describe('LoginprocessService', () => {
  let service: LoginprocessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginprocessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
