import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  protected basePath = 'https://whispering-spire-55253.herokuapp.com/home/projects';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  options= {
    options: this.headers
  }
  

  constructor(private httpClient: HttpClient) { }

  public getProjects() : Observable<any> {

    const path = this.basePath ;
    

     return this.httpClient.get(path);

  }
  public getProjectsOpen() : Observable<any> {

    const path = this.basePath + '/open' ;
    

     return this.httpClient.get(path);

  }
  
  public getProjectsNextToEnd() : Observable<any> {

    const path = this.basePath + '/nextToEnd' ;
    

    return this.httpClient.get(path);

  }

  public getProjectById(idProject: number): any {
    const path = this.basePath + `/${idProject}`;
    
    return this.httpClient.get(path);
  }
  createOrUpdateProject(project: any) : Observable<any> {
    console.log('asjackjamd')
    const path = this.basePath + '/createOrUpdateProject';
    console.log(project)
    return this.httpClient.post(path, project)
  }

}