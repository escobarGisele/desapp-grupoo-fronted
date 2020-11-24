import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    protected basePath = 'https://whispering-spire-55253.herokuapp.com';
    constructor(private httpClient: HttpClient) { }
    
        
    login(user: any): Observable<any> {
        const path = this.basePath + '/login';
        return this.httpClient.post(path, {username: user.nickName,password: user.password})
    }

    loginWithGoogle(data: any): Observable<any> {
        const path = this.basePath + '/loginWithGoogle';
        return this.httpClient.post(path, {
            id: 0,
            name: data.name,
            nickName: data.nickname,
            mail: data.email,
            password: "pass",
            isUserDonator: true,
            avatar: data.picture
        });
    }

}
