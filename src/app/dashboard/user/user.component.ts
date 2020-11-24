import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ModalUserComponent } from './modal-user/modal-user.component';
import {DonationComponent} from '../donation/donation.component'
import { TranslateService } from '@ngx-translate/core';
import { DonationService } from 'src/app/services/donation.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
  user:any
  listDonations: any[] = [];

  constructor(public translate: TranslateService,
              private userService: UserService,
              private donationService: DonationService,
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
    this.getUsersById();
    this.getDonationByUser();
  }

  getUsersById() :void {
    const idUser = parseInt(sessionStorage.getItem('userId'));
    this.userService.getUserById(idUser).subscribe(data => {
      this.user = data;
      this.loading = false;
    });
  }
  
  getDonationByUser() :void {
    const idUser = parseInt(sessionStorage.getItem('userId'));
    this.donationService.getDonationOfUser(idUser).subscribe(data => {
      this.listDonations = data;
      this.loading = false;
    });
  }

  editUserModal(){
    this.dialog.open(ModalUserComponent, {
      data: { user: this.user }
    });
  }

}
