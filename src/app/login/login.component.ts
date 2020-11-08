import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading=true;
  // login:FormGroup;

  // constructor(private fb: FormBuilder) { 
    // this.createForm();
  // }

  ngOnInit(): void {
  }

  // createForm(): void{
  //   this.login = this.fb.group({
  //     username: ['', [Validators.required, Validators.maxLength(20)]],
  //     password: ['',  [Validators.required]]
  //   });
  // }
  // saveProject() {
  //   const user: any = {
  //     userName: this.login.get('username').value,
  //     startDate: this.login.get('password').value
  //   };

  // }
}
