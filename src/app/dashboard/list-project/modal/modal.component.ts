import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms'


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  location:any; 

  newProjectForm:FormGroup = new FormGroup({
    locationControl: new FormControl('')
  });

  locationList = [
    { description: 'NATIONALITY_ITALIAN', code: 'ITA' },
    { description: 'NATIONALITY_FOREIGN', code: 'EST' }
  ];

  constructor( public dialogRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit() {
    this.location = this.locationList[0];
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
