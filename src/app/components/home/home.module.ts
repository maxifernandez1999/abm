import { NgModule } from '@angular/core';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { AlertsComponent } from './alerts/alerts.component';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    HomeComponent,
    ModalDeleteComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AlertsComponent,
    TableComponent
  ],
  imports:[
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class HomeModule { }
