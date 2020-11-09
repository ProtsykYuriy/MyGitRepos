import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GetReposService, Repos } from './services/get-repos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public columnDefs = [
    { field: 'name', sortable: true, filter: true },
    { field: 'language', sortable: true, filter: true },
    { field: 'size', sortable: true, filter: true },
    { field: 'star', sortable: true, filter: true }
  ];
  public rowRepositoryData$: BehaviorSubject<any> = new BehaviorSubject<Repos>(null);

  constructor(public getReposService: GetReposService) {

  }
  ngOnInit() {
    this.getReposService.getRepos().subscribe((response: Array<any>) => {
      const filteredReposArray: Array<Repos> = [];
      for (const repository of response) {
        filteredReposArray.push(
          {
            'name': repository.name,
            'language': repository.language,
            'size': repository.size,
            'star': repository.stargazers_count,
          }
        )
      }
      this.rowRepositoryData$.next(filteredReposArray)
    })
  }
}
