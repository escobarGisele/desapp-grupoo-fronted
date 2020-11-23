import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
