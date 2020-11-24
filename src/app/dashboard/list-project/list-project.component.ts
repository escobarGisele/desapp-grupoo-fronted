import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../../services/project.service';

import { TranslateService } from '@ngx-translate/core';
import { CreateEditModalComponent } from './createEditProject/modal.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})

export class ListProjectComponent implements OnInit {
  loading = true;
  listProject: any[]=[];
  listProjectNextToEnd:any[]=[];
  msg:string = '';
  model:any = {};
  model2:any = {};
  hideUpdate:boolean = true;
  isAdmin: boolean = !(/true/i).test(sessionStorage.getItem('esDonante'));

  displayedColumns: string[] = [ 'name', 'startDate', 'endDate', 'location', 'action'];
  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(public translate: TranslateService, private projectService: ProjectService, 
    public dialog: MatDialog, public snackBar:MatSnackBar,private router: Router) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.getProjects();
    this.dataSource = new MatTableDataSource(this.listProject);
    // setTimeout(() => this.dataSource.paginator = this.paginator);
    
    if(localStorage.getItem('auth_token') == null){
      this.router.navigate(['/login']);
      return;
    }
    this.getProjects();
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.listProject = data;
      this.dataSource = new MatTableDataSource(this.listProject);
      this.loading = false;
      console.log(data)
    });
  }
  getProjectsNextToEnd(): void {
    this.projectService.getProjectsNextToEnd().subscribe(data => {
      this.listProjectNextToEnd = data;
      this.loading = false;
    });
  }
  deleteProject(i:number){
    this.projectService.getProjects().subscribe(data => {
      this.listProject= data;
      data.splice(i,1);
      console.log(data)
      this.loading = false;
    });
    

  };
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
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

