import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})

export class ListProjectComponent implements OnInit {
 
  loading = true;
  listProject: any[]=[];
  
  constructor( private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
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
  //deleteProject( index :number ){
   // this.listProject.splice(index,1);

  //};
  //updateProyect(project,index){
    //this.listProject[index].finishProject =!project.finishProject;
  //}
  //metodo para imprimir el proyecto
  
  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.listProject = data;
      console.log(data);
      this.loading = false;
    });
  }
  
  
}

