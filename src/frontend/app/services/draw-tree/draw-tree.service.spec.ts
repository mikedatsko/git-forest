import { TestBed, inject } from '@angular/core/testing';

import { DrawTreeService } from './draw-tree.service';

describe('DrawTreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawTreeService]
    });
  });

  it('should be created', inject([DrawTreeService], (service: DrawTreeService) => {
    expect(service).toBeTruthy();
  }));
});
