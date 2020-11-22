import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
<<<<<<< HEAD
import { ModalUserComponent } from './modal-user/modal-user.component';
import {DonationComponent} from '../donation/donation.component'
import { TranslateService } from '@ngx-translate/core';
=======
// import { ModalUserComponent } from './modal-user/modal-user.component';

>>>>>>> main
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
<<<<<<< HEAD
  listUsers: any[]=[];
  user:any
  constructor(public translate: TranslateService,
              private userService: UserService,
=======
  user: any;
  constructor(private userService: UserService,
>>>>>>> main
              public dialog: MatDialog, 
              public snackBar:MatSnackBar,
              private router: Router) 
              {
                translate.addLangs(['en', 'es']);
                translate.setDefaultLang('es');
              }
              switchLang(lang: string) {
                this.translate.use(lang);
              }

  ngOnInit(): void {
<<<<<<< HEAD
   // this.getUsers();
    this.getUsersById(1);
    this.getRankingDonators();
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.listUsers = data;
     console.log(data);
      this.loading = false;
    });
  }
  getUsersById(idUser:number) :void {
    this.userService.getUsers().subscribe(data => {
      console.log(data[0]);
      this.user=idUser;
      console.log(this.user)
      this.loading = false;
    });
  }
  getRankingDonators():void{
    this.userService.getRankingDonators().subscribe(data => {
      this.listUsers = data;
      console.log(data)
=======
    this.getUser();
  }
  getUser(): void {
    const userId = parseInt(sessionStorage.getItem('userId'));
    console.log(userId)
    this.userService.getUserById(userId).subscribe(data => {
      this.user = data;
>>>>>>> main
      this.loading = false;
    });
  }

  

}
