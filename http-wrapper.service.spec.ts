import { TestBed, inject } from '@angular/core/testing';
import { HttpWrapperService } from './http-wrapper.service';

describe('HttpWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpWrapperService]
    });
  });

  it('should ...', inject([HttpWrapperService], (service: HttpWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
