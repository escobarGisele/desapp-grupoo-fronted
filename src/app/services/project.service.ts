import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  protected basePath = 'https://whispering-spire-55253.herokuapp.com';
  //public defaultHeaders : Headers = new Headers();
 public url : string = '/home/projects';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  

  constructor(private httpClient: HttpClient) { }

  public getProjects() : Observable<any> {

    const path = this.basePath + this.url ;
    //'+ /open' ;
    
  

     return this.httpClient.get(path);

}
}