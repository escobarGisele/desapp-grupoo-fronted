import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
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
import { MessagesComponent } from './dashboard/shared/messages/messages.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CreateEditModalComponent } from './dashboard/list-project/createEditProject/modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AuthModule } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalUserComponent } from './dashboard/user/modal-user/modal-user.component';

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
    MessagesComponent,
    CreateEditModalComponent,
    ModalUserComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    TooltipModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      domain: 'dev-d8bhv2ic.us.auth0.com',
      clientId: '99GTEsKQtrryt4bkYyafn8N0bwiw6QqV'
    })
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    CreateEditModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
