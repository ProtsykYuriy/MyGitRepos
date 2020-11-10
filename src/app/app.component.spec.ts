import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GetReposService, Repository } from './services/get-repos.service';
import { of, throwError } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let getReposSpy: jasmine.Spy;
  let testReposForTable: Repository[];
  let gridOptions: GridOptions = <GridOptions>{};

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
      providers: [{ provide: GetReposService, useValue: getReposService }],
      imports: [AgGridModule.withComponents([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain interpolated element', () => {
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(component.title);
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

  it('grid API is not available until  `detectChanges`', () => {
    expect(component.gridOptions.api).not.toBeTruthy();
  });

  it('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    expect(component.gridOptions.api).toBeTruthy();
  });
  it('the grid cells should be as expected', () => {
    const appElement = fixture.nativeElement;
    const grid = appElement.querySelector('ag-grid-angular');
    const headerElements = grid.querySelectorAll('.ag-header-cell-text');
    expect(headerElements.length).toBe(3);
    // expect(cellElements[0].textContent).toEqual("Test Name");
    // expect(cellElements[1].textContent).toEqual("42");
    // expect(cellElements[2].textContent).toEqual("84");
  });
});
