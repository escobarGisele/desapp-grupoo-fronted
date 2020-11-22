import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { MessagesComponent } from '../shared/messages/messages.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  dataSource = new MatTableDataSource();
  loading = true;
  listDonations: any[]=[];
  msg:string = '';
  model:any = {};
  model2:any = {};
  hideUpdate:boolean = true;
  project: any;
  newDonationForm:FormGroup;

  
  constructor(private donationService:DonationService,
              public dialog: MatDialog,
              public snackBar:MatSnackBar,
              private fb: FormBuilder,
              private projectService: ProjectService) {
    var idProject = parseInt(localStorage.getItem('idProject'));
    this.projectService.getProjectById(idProject).subscribe(response => {
      this.project = response
      this.fillField();
    });
  }

  ngOnInit(): void {
    this.getDonations();
    
    this.createForm();
    
  }
  getDonations(): void {
    this.donationService.getDonations().subscribe(data => {
      this.listDonations = data;
      this.loading = false;
    });
  
  }
  addDonation():void{
    this.listDonations.push(this.model);
    this.msg = 'campo agregado';    
    localStorage.setItem('idProject','')
  }

  createForm() {
    this.newDonationForm = this.fb.group({
      projectName: ['', [Validators.required]],
      locationName: ['',  [Validators.required]],
      invest: ['', [Validators.required]],
    });
  }

  fillField(){
    this.newDonationForm.patchValue({
      projectName: this.project.name,
      locationName: `${this.project.location.name} (${this.project.location.province})`
    });
  }
}

