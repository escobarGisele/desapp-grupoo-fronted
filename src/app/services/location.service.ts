import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  protected basePath = 'https://whispering-spire-55253.herokuapp.com';
  public url : string = '/home/locations';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
  });
  
  constructor(private httpClient: HttpClient) { }

  public getLocations() : Observable<any> {

    const path = this.basePath + this.url + '/locationWithOutProject' ;
    

    return this.httpClient.get(path, { 
      headers: this.headers 
     });


  }
  
  public getTop10WithMoreTimeWithoutDonations() : Observable<any> {

    const path = this.basePath + this.url +'/Top10WithMoreTimeWithoutDonations' ;
    

    return this.httpClient.get(path, { 
      headers: this.headers 
     });

  }
  

}
