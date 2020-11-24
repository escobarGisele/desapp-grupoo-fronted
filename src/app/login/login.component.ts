import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {LoginService} from '../services/login.service'
import {Router} from "@angular/router"
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService } from '@auth0/auth0-angular';
import { faMap } from '@fortawesome/free-solid-svg-icons';

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading=false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              public snackBar: MatSnackBar,
              private router: Router, 
              public auth: AuthService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.createForm();
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(data =>{
      this.loginService.loginWithGoogle(data).subscribe(res => {
        console.log(res)
      })
    })
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
        console.log(data)
        sessionStorage.setItem('Nombre', 'Mar');
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('esDonante', data.userDonator);

        this.router.navigate(['/dashboard']);
        localStorage.setItem('auth_token', data.token);
      },
      err => this.snackBar.open('Usuario y/o contraseña incorrectos', '', {
        duration: 3000
      })
    )
  }
  async loginWithRedirect() {
    this.auth.loginWithRedirect();
  }
}
