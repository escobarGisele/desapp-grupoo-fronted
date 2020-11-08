import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    protected basePath = 'https://whispering-spire-55253.herokuapp.com/home/users';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    options = {
        headers: this.headers
     }
    constructor(private httpClient: HttpClient) { }
    
        
    login(user: any): Observable<any> {
        const path = this.basePath + '/login';
        return this.httpClient.post(path, user)
    }

}
