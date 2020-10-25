import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  loading = true;
  listDonations: any[]=[];
  
  constructor(private donationService:DonationService) { }

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
}

