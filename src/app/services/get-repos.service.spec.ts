import { TestBed } from '@angular/core/testing';

import { GetReposService } from './get-repos.service';

describe('GetReposService', () => {
  let service: GetReposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
