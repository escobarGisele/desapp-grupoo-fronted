import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { LocationService } from 'src/app/services/location.service';
import { ProjectService } from 'src/app/services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

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
                public translate: TranslateService,
                @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    this.createForm();
    if(data != null){
      this.project= data.project;
      this.idProject= data.idProject;
      this.location = data.project.location;
      this.locationSelected = this.location.id
    }
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
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
      if(element != null){
        data.unshift(element);
      }
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
    if (this.newProjectForm.get('startDate').value > this.newProjectForm.get('endDate').value) {
      this.snackBar.open('Fecha de inicio no puede ser mayor a fecha de fin', '', {
        duration: 3000
      });
      this.newProjectForm.controls['startDate'].setErrors({'incorrect': true});
      this.newProjectForm.controls['endDate'].setErrors({'incorrect': true});
      return;
    }

    const project: any = {
      projectId: this.idProject ?? 0,
      name: this.newProjectForm.get('name').value,
      startDate: formatDate(this.newProjectForm.get('startDate').value, 'yyyy-MM-dd hh24:mm:ss', 'en-us'),
      endDate: formatDate(this.newProjectForm.get('endDate').value, 'yyyy-MM-dd hh24:mm:ss', 'en-us'),
      factor: this.newProjectForm.get('factor').value,
      locationId: this.newProjectForm.get('locationControl').value,
    };

    this.createOrUpdateProject(project);
  }

  createOrUpdateProject(project: any){
    var message = project.id == null ? 'Proyecto creado con exito!' : 'Proyecto actualizado con exito!';

    this.projectService.createOrUpdateProject(project).subscribe(data => {
      this.snackBar.open(message, '', {
        duration: 4500
      });
      this.dialogRef.close(data);
    });
  }
}
