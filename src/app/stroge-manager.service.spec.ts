import { TestBed } from '@angular/core/testing';

import { StrogeManagerService } from './stroge-manager.service';

describe('StrogeManagerService', () => {
  let service: StrogeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrogeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
