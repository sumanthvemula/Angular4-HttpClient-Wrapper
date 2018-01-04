import { TestBed, inject } from '@angular/core/testing';

import { HttpErrorHandlerService } from './http-error-handling.service';

describe('HttpErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorHandlerService]
    });
  });

  it('should ...', inject([HttpErrorHandlerService], (service: HttpErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
