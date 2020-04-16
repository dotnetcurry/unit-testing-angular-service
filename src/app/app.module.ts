import { BrowserModule } from '@angular/platform-browser';
import  { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { MockTravellerData } from './services/mock-traveller-data-provider';

import { AppComponent } from './app.component';
import { TravellerComponent } from './traveller/traveller.component';
import { DataAccessService } from './services/data-access.service';
import { TravellerListComponent } from './traveller-list/traveller-list.component';
import { LoggingInterceptorService } from './services/logging-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    TravellerComponent,
    TravellerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(MockTravellerData)
  ],
  providers: [
    DataAccessService,
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi:true}  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
