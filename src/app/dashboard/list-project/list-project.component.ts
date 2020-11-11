import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../../services/project.service';

import { TranslateService } from '@ngx-translate/core';
import { CreateEditModalComponent } from './createEditProject/modal.component';
import { Router } from '@angular/router';


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
  isAdmin: boolean = true;//!sessionStorage.getItem('esDonante');

  constructor(public translate: TranslateService, private projectService: ProjectService, 
    public dialog: MatDialog, public snackBar:MatSnackBar,private router: Router) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }


  ngOnInit(): void {
    if(sessionStorage.getItem('Nombre') == null){
      this.router.navigate(['/login']);
      return;
    }
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
    const dialogRef = this.dialog.open(CreateEditModalComponent, {});    
  } 

  editProject(idProject): void{
    this.projectService.getProjectById(idProject).subscribe(data => {
      this.dialog.open(CreateEditModalComponent, {
        data: { idProject: idProject, project: data }
      });
    });

  }
  makeADonation(idProject): void{
    localStorage.setItem('idProject', idProject);
    this.router.navigate(['/donation']);
  }
  
}

