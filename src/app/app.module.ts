import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

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

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { CommonModule, formatDate } from '@angular/common';
import { AngularMaterialModule } from './dashboard/shared/angular-material/angular-material.module';
import { LoadingComponent } from './dashboard/loading/loading.component';
import { UserComponent } from './dashboard/user/user.component';
import { DonationComponent } from './dashboard/donation/donation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesComponent } from './dashboard/shared/messages/messages.component';
import { CreateEditModalComponent } from './dashboard/list-project/createEditProject/modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AuthModule } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalUserComponent } from './dashboard/user/modal-user/modal-user.component';
import { ListLocationComponent } from './dashboard/list-location/list-location.component';
import { ModalEditLocationComponent } from './dashboard/list-location/modal/modal-edit-location.component'

@Pipe({
  name: 'amountConverter'
})

export class AmountConverterPipe implements PipeTransform {

  transform(value: number | string, locale?: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "ARS",
      currencyDisplay: "code"
    }).format(Number(value));
  }

}

@Pipe({
  name: 'currencyDateFormat'
})
export class CurrencyDateFormat implements PipeTransform{
  transform(value: string, currency: string): string {
      if (currency == 'es'){
          return formatDate(value , 'dd-MM-yyyy hh:mm:ss','en-US')
      }else{
          return formatDate(value , 'MM-dd-yyyy hh:mm:ss','en-US')
      }
  }
}

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
    AmountConverterPipe,
    CurrencyDateFormat,
    ListLocationComponent,
    ModalEditLocationComponent
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
      clientId: 'LyUdb2oSBSB1gmQaQ2L6gH28POb9vPqF'
    }),
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

