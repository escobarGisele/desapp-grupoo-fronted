import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-edit-location.component.html',
  styleUrls: ['./modal-edit-location.component.css']
})
export class ModalEditLocationComponent implements OnInit {
  
  location: any;
  locationForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<ModalEditLocationComponent>,
              private locationService: LocationService, 
              private fb: FormBuilder,
              private snackBar:MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) 
              { 
                this.createForm();
                this.location= data.location;
    }
  
              

  ngOnInit(): void {
    this.loadInformation()
  }

  createForm() {
    this.locationForm = this.fb.group({
      population: ['', [Validators.required]],
    });
  }

  loadInformation(){
    this.locationForm.patchValue({
      population: this.location.population
    });
  }

  onNoClick(): void {
    this.dialogRef.close(this.location);
  }
  saveData() {
    const locationUpdated: any = {
      id: this.location.id,
      population: this.locationForm.get('population').value,
    };

    this.locationService.updateInfo(locationUpdated).subscribe(data => {
      this.snackBar.open('Info actualizada con exito!', '', {
        duration: 3000
      });
      console.log(data)
      console.log(locationUpdated)
      this.dialogRef.close(data);
      });
  }

}
