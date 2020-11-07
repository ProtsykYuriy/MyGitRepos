import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Repos {
  name: string;
  language: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class GetReposService {
  public  repos$:BehaviorSubject<any> = new BehaviorSubject (null);
  

  constructor(private http: HttpClient) {

   }
  public fillTheTableWithRepos() {
    const reposArr = [];
    return this.http.get('https://api.github.com/users/ProtsykYuriy/repos').pipe(
      map((response: any) => {
        for(const data of response){
          reposArr.push(
            {
              name: data.name,
              language: data.language,
              size: data.size
            }
          )
        }
        this.repos$.next(reposArr);
        console.log(this.repos$.value);
      })
    )
  }
}
