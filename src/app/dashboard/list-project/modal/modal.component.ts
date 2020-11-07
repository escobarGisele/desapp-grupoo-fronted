import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms'


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  myval:any; // or your type

  myForm:FormGroup = new FormGroup({
    nationality: new FormControl('')
  });

  nationalityList = [
    { description: 'NATIONALITY_ITALIAN', code: 'ITA' },
    { description: 'NATIONALITY_FOREIGN', code: 'EST' }
  ];

  constructor( public dialogRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit() {
   this.myval = this.nationalityList[0]; // for example
  }
  // 
  // ngOnInit(): void {
  
  // }
 
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
