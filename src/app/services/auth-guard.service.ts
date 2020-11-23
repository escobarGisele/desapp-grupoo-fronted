import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  routeURL: string;
  userLoggedIn = sessionStorage.getItem("userId") != null;

  user = this.userLoggedIn ? {'name': sessionStorage.getItem('userId'), 'esDonante': sessionStorage.getItem('esDonante')} : null;

  constructor(private router: Router) {
    this.routeURL = this.router.url;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('auth_token')) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     if (!this.user && this.routeURL !== '/login') {
  //       this.routeURL = '/login';
  //       this.router.navigate(['/login'], {
  //         queryParams: {
  //           return: 'login'
  //         }
  //       });
  //       return resolve(false);
  //     } else {
  //       this.routeURL = this.router.url;
  //       return resolve(true);
  //     }
  //   });
  // }

  // canActivate(): boolean {
  //   let authentication = true;
  //   this.auth.isAuthenticated$.subscribe(
  //     val => {
  //       if(!val){
  //         this.router.navigate(['/login']);
  //         authentication = false;
  //       }
  //     }
  //   )
  //   return authentication;
  // }
}
