import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatToolbarModule, 
  MatInputModule, 
  MatCardModule, 
  MatSelectModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule,
  MatSnackBarModule } from '@angular/material';

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
    MatListModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
