import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../../services/project.service';

import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from './modal/modal.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})

export class ListProjectComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
  listProject: any[]=[];
  msg:string = '';
  model:any = {};
  model2:any = {};
  hideUpdate:boolean = true;
  isAdmin: boolean = true;

  constructor(public translate: TranslateService, private projectService: ProjectService, 
    public dialog: MatDialog, public snackBar:MatSnackBar) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }


  ngOnInit(): void {
    this.getProjects();
  }
  
  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.listProject = data;
      this.dataSource = new MatTableDataSource(this.listProject);
      this.loading = false;
    });
  }
  
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  createProject(){
    const dialogRef = this.dialog.open(ModalComponent, {});    
  } 

  editProject(idProject): void{
    const dialogRef = this.dialog.open(ModalComponent, {
      // width: '250px',
      data: { idProject: idProject }
    });
  }
  
}

