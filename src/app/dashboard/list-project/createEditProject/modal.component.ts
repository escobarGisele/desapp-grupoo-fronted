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
  locationSelected: any;
  loading = true;
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
      this.location = data.project.location;
      this.locationSelected = this.location.id
    }
  }

  ngOnInit() {
    var x = this.idProject != null? this.location : null;
    this.getListOfLocation(x);
    
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
  getListOfLocation(element? : any): void{
    this.locationService.getLocations().subscribe(data => {
      console.log(element != null)
      if(element != null){
        data.unshift(element);
      }
      this.locationList = data;
      this.loading = false;
    });
  }

  createForm() {
    this.newProjectForm = this.fb.group({//validaitors
      name: ['', [Validators.required, Validators.maxLength(20)]],
      startDate: ['',  [Validators.required]],
      endDate: ['', [Validators.required]],
      factor: ['', [Validators.required]],
      locationControl: ['', [Validators.required]],
    });
  }
  
  saveProject() {
    if (this.newProjectForm.get('startDate').value > this.newProjectForm.get('endDate').value) {
      this.snackBar.open('Fecha de inicio no puede ser mayor a fecha de fin', '', {
        duration: 3000
      });
      this.newProjectForm.controls['startDate'].setErrors({'incorrect': true});
      this.newProjectForm.controls['endDate'].setErrors({'incorrect': true});
      return;
      // return {[errorName]: true};
    }
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
