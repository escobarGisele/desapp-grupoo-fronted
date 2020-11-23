import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  
  location:any; 
  loading = true;
  action = 'Crear';

  newUserForm:FormGroup;
  idProject:number;
  listUsers: any []=[];
  user: any;
  constructor( public translate: TranslateService,
              public dialogRef: MatDialogRef<ModalUserComponent>,
              private locationService: LocationService, 
              private fb: FormBuilder,
              private userService: UserService, 
              private snackBar:MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) 
              { 
                translate.addLangs(['en', 'es']);
                translate.setDefaultLang('es');
                this.createForm();
    
    }
    switchLang(lang: string) {
      this.translate.use(lang);
    }
  
              

  ngOnInit(): void {
  }
  createForm() {
    this.newUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      mail: ['', [Validators.required]],
      nickName: ['',  [Validators.required]],
      password: ['', [Validators.required]],
      
      
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
