import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Repos {
  name: string;
  language: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class GetReposService {

  constructor(private http: HttpClient) {

  }

  public getRepos(){
    return this.http.get('https://api.github.com/users/ProtsykYuriy/repos')
  }
}
