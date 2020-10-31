import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../../services/project.service';
import { MessagesComponent } from '../shared/messages/messages.component';
import { TranslateService } from '@ngx-translate/core';

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
 
  // addProject():void{
  //   this.listProject.push(this.model);
  //   this.msg = 'campo agregado';
  // }
  //
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  
  // deleteProject( index :number ){
  //   const dialogRef = this.dialog.open(MessagesComponent, {
  //     width: '250px',
  //     data: {message: 'Delete the project?'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result === 'accept'){
  //       this.listProject.splice(index,1);
  //       this.snackBar.open('Project successfully deleted', '', {duration: 30000})
  //     }
      
  //   });    
  // }
  
  
}

