import { of } from 'rxjs';
import { GetReposService, Repository } from './get-repos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('GetReposService', () => {
  let httpTestingController: HttpTestingController;
  let getRepoService: GetReposService;
  let getRepoServiceSpy: GetReposService;
  let httpClientSpy: { get: jasmine.Spy };
  let ReposIncome: Repository[] = [
    {
      name: 'Local server',
      language: 'JavaScript',
      size: 2390,
      stargazers_count: 1,
    },
    {
      name: 'Counter',
      language: 'TypeScript',
      size: 570,
      stargazers_count: 0,
    },
  ];
  let expectedReposOutput: Repository[] = [
    {
      name: 'Local server',
      language: 'JavaScript',
      size: 2390,
      star: 1,
    },
    {
      name: 'Counter',
      language: 'TypeScript',
      size: 570,
      star: 0,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetReposService],
    });
    getRepoService = TestBed.inject(GetReposService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    getRepoServiceSpy = new GetReposService(httpClientSpy as any);
  });
  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(getRepoServiceSpy).toBeTruthy();
  });

  it('should return expected repos (HttpClient called once)', () => {
    httpClientSpy.get.and.returnValue(of(ReposIncome));
    getRepoServiceSpy
      .getRepos()
      .subscribe(
        (repos) => expect(repos).toEqual(expectedReposOutput, 'expected repos'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('can test HttpClient.get with httpTestingController', () => {
    getRepoService
      .getRepos()
      .subscribe((response) => expect(response).toEqual(expectedReposOutput));
    const req = httpTestingController.expectOne(
      'https://api.github.com/users/ProtsykYuriy/repos'
    );
    expect(req.request.method).toBe('GET');
    req.flush(ReposIncome);
  });

  it('can test HttpClient.get wit error response', () => {
    const message = 'Session expired';
    getRepoService.getRepos().subscribe(
      (response) => fail('should fail with the 401 error'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(401, 'status');
        expect(err.error).toBe(message, 'message');
      }
    );
    const req = httpTestingController.expectOne(
      'https://api.github.com/users/ProtsykYuriy/repos'
    );
    expect(req.request.method).toBe('GET');
    req.flush(message, { status: 401, statusText: 'Unauthorized' });
  });

  // it('should return an error when the server returns a 404', () => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404, statusText: 'Not Found'
  //   });
  //   httpClientSpy.get.and.returnValue(of(errorResponse));
  //   service.getRepos().subscribe(
  //     repos => fail('expected an error, not repos'),
  //     error  => expect(error.message).toContain('test 404 error')
  //   );
  // })
});
