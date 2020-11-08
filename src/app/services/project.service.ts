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
    

     return this.httpClient.get(path);

  }
  public getProjectsOpen() : Observable<any> {

    const path = this.basePath + this.url+ '/open' ;
    

     return this.httpClient.get(path);

  }
  
  public getProjectsNextToEnd() : Observable<any> {

    const path = this.basePath + this.url+ '/nextToEnd' ;
    

    return this.httpClient.get(path);

  }

  public getProjectById(idProject: number): any {
    const path = this.basePath + this.url+ `/${idProject}`;
    
    return this.httpClient.get(path);
  }
  editProject(project: any, idProject: any) {
    throw new Error('Method not implemented.');
  }
  addProject(project: any) {
    throw new Error('Method not implemented.');
  }

}