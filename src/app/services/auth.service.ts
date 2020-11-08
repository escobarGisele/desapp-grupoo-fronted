import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(sessionStorage.getItem('Name') != null); // {1}

    get isLoggedIn() {
        return this.loggedIn.asObservable(); // {2}
    }

    constructor() {}
}