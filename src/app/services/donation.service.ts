import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DonationService {
  protected basePath = 'https://whispering-spire-55253.herokuapp.com';
  public url : string = '/home/donations';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  constructor(private httpClient: HttpClient) { }

    public getDonations() : Observable<any> {

      const path = this.basePath + this.url ;
      
  
       return this.httpClient.get(path);
  
  }

  public getDonationsId(id:number) : Observable<any> {

    const path = this.basePath + this.url +'{id}';
    

     return this.httpClient.get(path);

}
  
}
