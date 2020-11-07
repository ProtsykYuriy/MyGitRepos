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

    this.getReposService.fetchMyGitRepos().subscribe((data:any)=>{
      data.map((item)=>this.rowData.push(
        {name : item.name,
        language : item.language,
        size : item.size}))
    })
    console.log(this.rowData);
    // this.getReposService.fillTheTableWithRepos();

  }

  columnDefs = [
      { field: 'name' },
      { field: 'language' },
      { field: 'size'}
  ];
  rowData = [{name: "461-html", language: "HTML", size: 2321}];
}
