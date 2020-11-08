import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { DonationComponent } from './dashboard/donation/donation.component';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { ModalComponent } from './dashboard/list-project/modal/modal.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'edit/:id', component: ModalComponent },
  { path:'login', component : LoginComponent},
  { path:'dashboard', component : DashboardComponent},
  { path:'user', component : UserComponent},
  { path:'resgister', component : ResgisterComponent},
  { path:'donation', component : DonationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
