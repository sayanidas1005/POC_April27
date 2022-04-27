import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import {HttpClientModule} from '@angular/common/http';
import { DisplayService } from './display/display.service';
import { HomeService } from './home/home.service';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './display/button-renderer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent,
    ButtonRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([ButtonRendererComponent])
  ],
  providers: [
    DisplayService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
