import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {

    private loggedIn = new BehaviorSubject<boolean>(sessionStorage.getItem('Name') != null); // {1}

    get isLoggedIn() {
        return this.loggedIn.asObservable(); // {2}
    }

}