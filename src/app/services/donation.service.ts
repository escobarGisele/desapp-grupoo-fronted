import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DonationService {
  protected basePath = 'https://whispering-spire-55253.herokuapp.com/home/donations';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
  });
  
  constructor(private httpClient: HttpClient) { }

    public getDonations() : Observable<any> {

      const path = this.basePath;
      
  
      return this.httpClient.get(path, { 
        headers: this.headers 
       });
 
  
  }

  public getDonationsId(id:number) : Observable<any> {

    const path = this.basePath + `/${id}`;

    return this.httpClient.get(path, { 
        headers: this.headers 
      });
  }

  public getDonationOfUser(userId) : Observable<any>{
    const path = this.basePath + `/user?userId=${userId}`
    
    return this.httpClient.get(path, { 
        headers: this.headers 
      });
  }

  public createDonation(donation: any) : Observable<any>{
    const path = this.basePath + '/create'

    return this.httpClient.post(path, donation, { 
      headers: this.headers 
    });
  }

}
