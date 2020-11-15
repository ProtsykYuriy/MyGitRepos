import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GetReposService, Repository } from './services/get-repos.service';
import { of, throwError } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';
import { HttpErrorResponse } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  //let getReposSpy: jasmine.Spy;
  let testReposForTable: Repository[];
  let getReposService: any;
  let service: GetReposService;

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
    getReposService = jasmine.createSpyObj('GetReposService', ['getRepos']);
    getReposService.getRepos.and.returnValue(
      of(testReposForTable));
    // getReposSpy = getReposService.getRepos.and.returnValue(
    //   of(testReposForTable)
    // );

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: GetReposService, useValue: getReposService }],
      imports: [AgGridModule.withComponents([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain interpolated element', () => {
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(component.title);
  });

  it('should call getReposSpy', () => {
    fixture.detectChanges();
    expect(getReposService.getRepos).toHaveBeenCalled();
  });

  xit('grid API is not available until  `detectChanges`', () => {
    expect(component.gridOptions.api).not.toBeTruthy();
  });

  xit('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    expect(component.gridOptions.api).toBeTruthy();
  });

  xit('the grid cells should be as expected', () => {
    const appElement = fixture.nativeElement;
    const grid = appElement.querySelector('ag-grid-angular');
    const headerElements = grid.querySelectorAll('.ag-header-cell-text');
    //expect(headerElements.length).toBe(3);
    expect(headerElements[0].textContent).toEqual('Test Name');
    // expect(cellElements[1].textContent).toEqual("42");
  });

  it('should set Error message when getRepos() is errored out', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    getReposService.getRepos.and.throwError('err');
    expect(component.errorObject.showErrorMsg).toBeFalse();
    expect(getReposService.getRepos).toHaveBeenCalled();
    expect(component.errorObject.showErrorMsg).toBeTrue();
  });
});
