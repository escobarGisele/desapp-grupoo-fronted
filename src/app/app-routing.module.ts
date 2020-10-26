import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { DonationComponent } from './dashboard/donation/donation.component';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { AddProjectComponent } from './dashboard/add-project/add-project.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'login', component : LoginComponent},
 {path:'dashboard', component : DashboardComponent},
 {path:'user', component : UserComponent},
 {path:'resgister', component : ResgisterComponent},
 {path:'donation', component : DonationComponent},
 {path:'add', component : AddProjectComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
