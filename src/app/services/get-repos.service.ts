import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, from } from 'rxjs';

export interface Repository {
  name: string;
  language: string;
  size: number;
  star?: number;
  stargazers_count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GetReposService {

  constructor(private http: HttpClient) {

  }

  public getRepos() {
    return this.http.get('https://api.github.com/users/ProtsykYuriy/repos').pipe(
      map((response: Repository[]) =>
        response.map((repo): Repository => repo = { 'name': repo.name, 'language': repo.language, 'size': repo.size, 'star': repo.stargazers_count })),
        catchError(err => {
          console.log(err);
          throw 'Server error. Details: ' + err;
        }),
        
    )
  }
}
