import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { LocationService } from 'src/app/services/location.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListProjectComponent } from '../list-project.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class CreateEditModalComponent implements OnInit {
  
  location:any; 
  loading = true;
  serializedDate = new FormControl((new Date()).toISOString());
  action = 'Crear';

  newProjectForm:FormGroup;
  idProject:number;
  locationList: any[]=[];

  constructor(  public dialogRef: MatDialogRef<CreateEditModalComponent>,
                private locationService: LocationService, 
                private fb: FormBuilder,
                private projectService: ProjectService, 
                private snackBar:MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.createForm();
    if(data != null){
      console.log(data.project)
      this.idProject= data.idProject;
    }
  }
  
  ngOnInit() {
    this.getListOfLocation();
    this.location = this.locationList[0];
    console.log(this.idProject)
    
    // if (this.idProject !== undefined) {
    //   this.action = 'Editar';
    //   this.isEdit();
    // }
  }
  isEdit() {
    const project: any = this.projectService.getProjectById(this.idProject);
    console.log(project);
    this.newProjectForm.patchValue({
      name: project.name,
      factor: project.factor,
      startDate: project.startDate,
      endDate: project.endDate,
      location: project.location
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
      location: this.newProjectForm.get('locationControl').value,
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
