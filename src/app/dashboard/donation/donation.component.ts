import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { MessagesComponent } from '../shared/messages/messages.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
  listDonations: any[]=[];
  msg:string = '';
  model:any = {};
  model2:any = {};
  hideUpdate:boolean = true;
//

  
  constructor(private donationService:DonationService, public dialog: MatDialog, public snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getDonations();
  }
  getDonations(): void {
    this.donationService.getDonations().subscribe(data => {
      this.listDonations = data;
      console.log(data);
      this.loading = false;
    });
  
  }
  addDonation():void{
    this.listDonations.push(this.model);
    this.msg = 'campo agregado';
  }
  deleteDonation( index :number ){
    const dialogRef = this.dialog.open(MessagesComponent, {
      width: '250px',
      data: {message: 'Delete the donation?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'accept'){
        this.listDonations.splice(index,1);
        this.snackBar.open('Donation successfully deleted', '', {duration: 30000})
      }
      
    });    
  }


}

