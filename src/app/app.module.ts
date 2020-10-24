import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListProjectComponent } from './dashboard/list-project/list-project.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { ResgisterComponent } from './resgister/resgister.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListProjectComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    
    ResgisterComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
