import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { LocationService } from 'src/app/services/location.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListProjectComponent } from '../list-project.component';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class CreateEditModalComponent implements OnInit {
  
  location:any; 
  loading = true;
  // serializedDate = new FormControl((new Date()).toISOString());
  action = 'Crear';

  newProjectForm:FormGroup;
  idProject:number;
  locationList: any []=[];
  project: any;
  constructor(  public dialogRef: MatDialogRef<CreateEditModalComponent>,
                private locationService: LocationService, 
                private fb: FormBuilder,
                private projectService: ProjectService, 
                private snackBar:MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.createForm();
    if(data != null){
      this.project= data.project;
      this.idProject= data.idProject;
      this.locationList.push(data.project.location);
      this.location = "1";
    }
  }
  
  ngOnInit() {
    this.getListOfLocation();
    
    if (this.idProject !== undefined) {
      this.action = 'Editar';
      this.isEdit();
    }
  }
  isEdit() {
    this.location = this.project.location;
    this.newProjectForm.patchValue({
      name: this.project.name,
      factor: this.project.factor,
      startDate:  new Date(this.project.startDate),
      endDate: new Date(this.project.endDate),
      locationControl: this.project.location
    });
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

  createForm() {
    this.newProjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      startDate: ['',  [Validators.required]],
      endDate: ['', [Validators.required]],
      factor: ['', [Validators.required]],
      locationControl: ['', [Validators.required]],
    });
  }

  saveProject() {
    const project: any = {
      name: this.newProjectForm.get('name').value,
      startDate: this.newProjectForm.get('startDate').value,
      endDate: this.newProjectForm.get('endDate').value,
      factor: this.newProjectForm.get('factor').value,
      locationControl: this.newProjectForm.get('locationControl').value,
    };

    if (this.idProject !== undefined) {
      this.editProject(project);
    } else {
      this.addProject(project);
    }
  }

  addProject(project: any) {
    // this.projectService.addProject(project);
    this.snackBar.open('Proyecto creado con exito!', '', {
      duration: 3000
    });
    this.dialogRef.close();
  }

  editProject(project: any) {
    // this.projectService.editProject(project, this.idProject);
    this.snackBar.open('Proyecto actualizado con exito!', '', {
      duration: 3000
    });
    this.dialogRef.close();
  }

}
