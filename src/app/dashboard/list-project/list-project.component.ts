import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../../services/project.service';
import { MessagesComponent } from '../shared/messages/messages.component';


@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})

export class ListProjectComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
  listProject: any[]=[];
  
  constructor( private projectService: ProjectService, public dialog: MatDialog, public snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getProjects();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //addProject(){

    //const project={
      //  name: this.project,
        //finishProject:false

    //};
    //console.log(this.listProject);
    //this.listProject.push(project);
    //this.project='';
  //};
  //aca pongo index:num , pero en el proyecto nuestro cada proyecto ya trae un id q lo identifica
  deleteProject( index :number ){
    const dialogRef = this.dialog.open(MessagesComponent, {
      width: '250px',
      data: {message: 'Delete the project?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'accept'){
        this.listProject.splice(index,1);
        this.snackBar.open('Project successfully deleted', '', {duration: 30000})
      }
      
    });

    
  }
    


  
  
  //updateProyect(project,index){
    //this.listProject[index].finishProject =!project.finishProject;
  //}
  //metodo para imprimir el proyecto
  
  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.listProject = data;
      console.log(data);
      this.dataSource = new MatTableDataSource(this.listProject);
      this.loading = false;
    });
  }
  
  
}

