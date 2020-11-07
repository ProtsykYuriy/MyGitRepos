import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetReposService {
  

  constructor(private http: HttpClient) { }
  public fetchMyGitRepos() {
    return this.http.get('https://api.github.com/users/ProtsykYuriy/repos')
  }
  // public fillTheTableWithRepos() {
  //   const reposArr = [];
  //   return this.http.get('https://api.github.com/users/ProtsykYuriy/repos').pipe(
  //     map((item:any) => {
  //       for(const data of item){
  //         reposArr.push(
  //           {
  //             name: data.name,
  //             language: data.language,
  //             size: data.size
  //           }
  //         )
  //       }
  //     })
  //   )
  // }
}
