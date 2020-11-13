import { Observable,  throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GetReposService, Repository } from './services/get-repos.service';
import { GridOptions } from 'ag-grid-community';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'My Git Repos';
  public gridOptions: GridOptions ;
  public columnDefs = [
    { field: 'name', sortable: true, filter: true },
    { field: 'language', sortable: true, filter: true },
    { field: 'size', sortable: true, filter: true },
    { field: 'star', sortable: true, filter: true },
  ];
  public rowRepositoryData$: Observable<Repository[]> = null;
  public errorObject = {showErrorMsg: false, status: null, message: null};

  constructor(public getReposService: GetReposService) {}

  ngOnInit(){
    this.rowRepositoryData$ = this.getReposService.getRepos().pipe(
      catchError(err => {
        this.errorObject.showErrorMsg = true;
        this.errorObject.status = err.status;
        this.errorObject.message = err.statusText;
        console.log('error', err);
        return throwError(err);
      })
    );
  }

  onGridReady(gridOptionsIncome) {
    console.log(gridOptionsIncome);
    this.gridOptions = gridOptionsIncome;
    console.log(this.gridOptions);
  }
}
