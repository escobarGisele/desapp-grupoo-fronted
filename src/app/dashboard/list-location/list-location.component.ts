import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LocationService } from '../../services/location.service';

import { TranslateService } from '@ngx-translate/core';
import { ModalEditLocationComponent } from './modal/modal-edit-location.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css']
})

export class ListLocationComponent implements OnInit {
  loading = true;
  listLocations: any[]=[];
  msg:string = '';
  model:any = {};
  isAdmin: boolean = !(/true/i).test(sessionStorage.getItem('esDonante'));

  displayedColumns: string[] = [ 'name', 'province', 'population', 'action'];
  
  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(public translate: TranslateService, private locationService: LocationService, 
    public dialog: MatDialog, public snackBar:MatSnackBar,private router: Router) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listLocations);
    
    if(localStorage.getItem('auth_token') == null){
      this.router.navigate(['/login']);
      return;
    }
    this.geLocations();
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  
  geLocations(): void {
    this.locationService.getLocations().subscribe(data => {
      this.listLocations = data;
      this.dataSource = new MatTableDataSource(this.listLocations);
      this.loading = false;
      console.log(data)
    });
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  editLocation(location): void{
    const dialogRef = this.dialog.open(ModalEditLocationComponent, {
      data: { location: location }
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
      this.replaceProjectIfItsNecessary(result);
    });
  }

  replaceProjectIfItsNecessary(project: any){
    let updateItem = this.listLocations.find(this.findIndexToUpdate, project.id);

    let index = this.listLocations.indexOf(updateItem);
    
    this.listLocations[index] = project;
    this.dataSource = new MatTableDataSource(this.listLocations);
    this.dataSource._updateChangeSubscription();

  }

  findIndexToUpdate(newItem) { 
    return newItem.id === this;
  }

}
