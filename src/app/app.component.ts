import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GetReposService, Repository } from './services/get-repos.service';
import { GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'My Git Repos';
  public gridOptions: GridOptions;
  public columnDefs = [
    { field: 'name', sortable: true, filter: true },
    { field: 'language', sortable: true, filter: true },
    { field: 'size', sortable: true, filter: true },
    { field: 'star', sortable: true, filter: true },
  ];
  public rowRepositoryData$: Observable<Repository[]>;

  constructor(public getReposService: GetReposService) {}

  ngOnInit(): void {
    this.rowRepositoryData$ = this.getReposService.getRepos();
  }

  onGridReady(gridOptionsIncome) {
    console.log(gridOptionsIncome);
    this.gridOptions = gridOptionsIncome;
  }
}
