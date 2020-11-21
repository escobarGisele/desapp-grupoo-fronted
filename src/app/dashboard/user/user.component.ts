import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ModalUserComponent } from './modal-user/modal-user.component';
import {DonationComponent} from '../donation/donation.component'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
  listUsers: any[]=[];
  constructor(private userService: UserService,
              public dialog: MatDialog, 
              public snackBar:MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.listUsers = data;
      console.log(data);
      this.loading = false;
    });
  }
  createProject(){
    const dialogRef = this.dialog.open(ModalUserComponent, {});    
  } 

  

}
