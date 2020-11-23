import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@auth0/auth0-angular';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
// import * as config from '../../../auth_config.json';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Auth2Service {

  protected path = 'https://dev-d8bhv2ic.us.auth0.com/oauth/token';
  // Produccion 'Content-Type': 'application/x-www-form-urlencoded'
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
    body ={ grant_type:"client_credentials",
            client_id:"99GTEsKQtrryt4bkYyafn8N0bwiw6QqV",
            client_secret:"hysx847lAA1ou09RgGJT0mAMGRg2vTDARiX6enmOFVX5BhGJaDn7mggDOBcwiVEI",
            audience:"https://dev-d8bhv2ic.us.auth0.com/api/v2/"
          };
    
    constructor(private httpClient: HttpClient)  { }
        
    login(): Observable<any> {
      const path = this.path;
      const headers = this.headers;
      const body = this.body;
      return this.httpClient.post(path, body, { headers });
    }
    


}
