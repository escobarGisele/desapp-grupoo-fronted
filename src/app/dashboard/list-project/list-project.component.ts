import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  //variable para la carga de un proyecto
  //project = '';
  //list iria con la clase nuestra 
  listProject: any[]=[];
  constructor( private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }
  //metodo para imprimir el proyecto
  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.listProject = data.data;
      console.log(data.data);
      //this.loading = false;
    });
  }
}

