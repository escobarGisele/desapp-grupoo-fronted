import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {LoginService} from '../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading=true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService,  public snackBar: MatSnackBar) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void{
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['',  [Validators.required]]
    });
  }
  login() {
    var userName= this.loginForm.get('username').value;
    var pass = this.loginForm.get('password').value;

    console.log(userName,pass)
    if(userName == '' || pass == ''){
      this.loginForm.markAllAsTouched();
    }

    if(this.loginForm.invalid){
      this.snackBar.open('Debe ingresar sus credenciales1', '', {
        duration: 3000
      })
      return;
    }
    const user: any = {
      nickName: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };

    this.loginService.login(user).subscribe(
      data => {
        console.log(data);
      },
      err => this.snackBar.open('Usuario y/o contraseña incorrectos', '', {
        duration: 3000
      }),
      () => this.snackBar.open('Debe ingresar sus credenciales', '', {
        duration: 3000
      })
    )
  }
}
