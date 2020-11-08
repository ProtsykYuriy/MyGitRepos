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
    { field: 'size', sortable: true, filter: true }
  ];
  public rowDat$: BehaviorSubject<any> = new BehaviorSubject<Repos>(null);

  constructor(public getReposService: GetReposService) {

  }
  ngOnInit() {
    const reposArr2 = [];
    this.getReposService.getRepos().subscribe((data: Array<Repos>) => {
      for (const item of data) {
        reposArr2.push(
          {
            name: item.name,
            language: item.language,
            size: item.size
          }
        )
      }
      this.rowDat$.next(reposArr2)
    })
  }
}
