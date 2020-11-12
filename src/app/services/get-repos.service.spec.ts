import { of } from 'rxjs';
import { GetReposService, Repository } from './get-repos.service';

describe('GetReposService', () => {
  let service: GetReposService;
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
    //TestBed.configureTestingModule({providers: [GetReposService]});
    // service = TestBed.inject(GetReposService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GetReposService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected repos (HttpClient called once)', () => {
    httpClientSpy.get.and.returnValue(of(ReposIncome));
    service
      .getRepos()
      .subscribe(
        (repos) => expect(repos).toEqual(expectedReposOutput, 'expected repos'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
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
