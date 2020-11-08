import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { DonationComponent } from './dashboard/donation/donation.component';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full',canActivate:[AuthGuardService]  },
  { path:'login', component : LoginComponent},
  { path:'dashboard', component : DashboardComponent, canActivate:[AuthGuardService] },
  { path:'user', component : UserComponent, canActivate:[AuthGuardService] },
  { path:'resgister', component : ResgisterComponent},
  { path:'donation', component : DonationComponent, canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
