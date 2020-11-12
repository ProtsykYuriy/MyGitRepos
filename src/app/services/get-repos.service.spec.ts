import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { GetReposService, Repository } from './get-repos.service';


describe('GetReposService', () => {
  let service: GetReposService;
  let httpClientSpy: { get: jasmine.Spy };
  let expectedRepos: Repository[];

  beforeEach(() => {
    //TestBed.configureTestingModule({providers: [GetReposService]});
    // service = TestBed.inject(GetReposService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GetReposService(httpClientSpy as any);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should return expected repos (HttpClient called once)', () => {
    expectedRepos =
    [
      {
        name: 'Local server',
        language: 'JavaScript',
        size: 2390,star: 1,
      },
      {
        name: 'Counter',
        language: 'TypeScript',
        size: 570,
      },
    ];
    httpClientSpy.get.and.returnValue(of(expectedRepos));
    service.getRepos().subscribe(
      repos => expect(repos).toEqual(expectedRepos, 'expected repos'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  xit('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(of(errorResponse));
    service.getRepos().subscribe(
      repos => fail('expected an error, not heroes'),
      error  => expect(error.message).toContain('test 404 error')
    );
  })

  xit('getRepos should return observable',
    (done: DoneFn) => {
    service.getRepos().subscribe(value => {
      expect(value).toBeInstanceOf(Object);
      done();
    });
  });
});
