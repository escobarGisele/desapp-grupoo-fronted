import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  routeURL: string;
  userLoggedIn = sessionStorage.getItem("esDonante") != null;

  user = this.userLoggedIn ? {'name': sessionStorage.getItem('Nombre'), 'esDonante': sessionStorage.getItem('esDonante')} : null;

  constructor(private router: Router) {
    this.routeURL = this.router.url;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.user && this.routeURL !== '/login') {
        this.routeURL = '/login';
        this.router.navigate(['/login'], {
          queryParams: {
            return: 'login'
          }
        });
        return resolve(false);
      } else {
        this.routeURL = this.router.url;
        return resolve(true);
      }
    });
  }
}
