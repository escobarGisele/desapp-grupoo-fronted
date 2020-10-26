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

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './dashboard/shared/angular-material/angular-material.module';
import { LoadingComponent } from './dashboard/loading/loading.component';
import { UserComponent } from './dashboard/user/user.component';
import { DonationComponent } from './dashboard/donation/donation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListProjectComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    ResgisterComponent,
    LoadingComponent,
    UserComponent,
    DonationComponent,

  
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
