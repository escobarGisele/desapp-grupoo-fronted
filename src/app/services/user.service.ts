import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected basePath = 'https://whispering-spire-55253.herokuapp.com/home/users';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
  });
  
  constructor(private httpClient: HttpClient) { }
  
    public getUsers() : Observable<any> {
      const path = this.basePath ;
      return this.httpClient.get(path, { 
          headers: this.headers 
        });

    }

    public getUserById(id:number) : Observable<any> {
      const path = this.basePath + `/${id}`;
      return this.httpClient.get(path, { 
          headers: this.headers 
        });

    }

    public getUserPoints() : Observable<any> {
      const path = this.basePath + '/points';
      return this.httpClient.get(path, { 
          headers: this.headers 
        });

    }
    
    public getRankingDonators() : Observable<any> {
      const path = this.basePath + '/rankingDonators';
      return this.httpClient.get(path, { 
          headers: this.headers 
        });

    }

    public updateInfo(user) : Observable<any>{
      const path = this.basePath + '/createOrUpdateUser';

      return this.httpClient.post(path, user, { 
        headers: this.headers 
      });
    }
    

}
