import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationService } from 'src/app/services/location.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  
  location:any; 
  loading = true;
  action = 'Crear';

  newProjectForm:FormGroup;
  idProject:number;
  locationList: any []=[];
  project: any;
  constructor( public dialogRef: MatDialogRef<ModalUserComponent>,
              private locationService: LocationService, 
              private fb: FormBuilder,
              private projectService: ProjectService, 
              private snackBar:MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.createForm();
    if(data != null){
      this.project= data.project;
      this.idProject= data.idProject;
      this.locationList.push(data.project.location);
      this.location = "1";
    }
              }

  ngOnInit(): void {
  }
  createForm() {
    this.newProjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      startDate: ['',  [Validators.required]],
      endDate: ['', [Validators.required]],
      factor: ['', [Validators.required]],
      locationControl: ['', [Validators.required]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addProject(project: any) {
    // this.projectService.addProject(project);
    this.snackBar.open('Proyecto creado con exito!', '', {
      duration: 3000
    });
    this.dialogRef.close();
  }

}
