import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {GetReposService} from './services/get-repos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myGitRepos';  
  constructor(public getReposService: GetReposService){

  }
  ngOnInit(){
    this.getReposService.fillTheTableWithRepos().subscribe();
    this.getReposService.repos$.subscribe((repos)=>{
      console.log(repos);
      if(repos){
        this.rowData = repos;
      }
    })
  }

  columnDefs = [
      { field: 'name' },
      { field: 'language' },
      { field: 'size'}
  ];
  rowData = [];
}
