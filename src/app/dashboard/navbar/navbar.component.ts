import { Component, OnInit, Inject } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Auth2Service } from 'src/app/services/auth2.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(
    public translate: TranslateService,
    public auth: AuthService,
    public auth2: Auth2Service,
    @Inject(DOCUMENT) private doc: Document
  ) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  
  ngOnInit(): void {
    localStorage.removeItem('auth_token');
    this.auth.isAuthenticated$.subscribe(
      loggedIn =>{
        if(loggedIn){
          this.auth2.login().subscribe(data => {
            localStorage.setItem('auth_token', data.access_token);
          });
        }
      }  
    )
  }

  async loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
