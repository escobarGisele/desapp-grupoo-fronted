import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
// import { ModalUserComponent } from './modal-user/modal-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
  user: any;
  constructor(private userService: UserService,
              public dialog: MatDialog, 
              public snackBar:MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const userId = parseInt(sessionStorage.getItem('userId'));
    console.log(userId)
    this.userService.getUserById(userId).subscribe(data => {
      this.user = data;
      this.loading = false;
    });
  }

  

}
