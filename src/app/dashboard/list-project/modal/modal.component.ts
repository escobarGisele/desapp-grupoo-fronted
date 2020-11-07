import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms'
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  location:any; 
  loading = true;

  newProjectForm:FormGroup = new FormGroup({
    locationControl: new FormControl('')
  });

  locationList: any[]=[];

  constructor( public dialogRef: MatDialogRef<ModalComponent>,private locationService: LocationService,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit() {
    this.getListOfLocation();
    this.location = this.locationList[0];
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  getListOfLocation(): void{
    this.locationService.getLocations().subscribe(data => {
      this.locationList = data;
      this.loading = false;
    });
  }
}
