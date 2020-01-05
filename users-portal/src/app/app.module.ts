import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatToolbarModule, 
  MatInputModule, 
  MatCardModule, 
  MatSelectModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule } from '@angular/material';

import { TextMaskModule } from 'angular2-text-mask'

import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    TextMaskModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
