import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GetReposService, Repository } from './services/get-repos.service';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let getReposSpy: jasmine.Spy;
  let testReposForTable: Repository[];

  beforeEach(async () => {
    testReposForTable = [
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
    const getReposService = jasmine.createSpyObj('GetReposService', [
      'getRepos',
    ]);
    getReposSpy = getReposService.getRepos.and.returnValue(
      of(testReposForTable)
    );

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        AppComponent,
        { provide: GetReposService, useValue: getReposService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain interpolated element', () => {
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(app.title);
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('My Git Repos');
  });

  it('should call getReposSpy', () => {
    fixture.detectChanges();
    expect(getReposSpy.calls.any()).toBe(true, 'getRepos called');
  });
});
