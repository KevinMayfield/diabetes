import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LaunchComponent } from './components/launch/launch.component';
import { AppRoutingModule } from './/app-routing.module';
import { RiskCalcComponent } from './components/risk-calc/risk-calc.component';
import {MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatStepperModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RedirectComponent} from "./components/redirect/redirect.component";


@NgModule({
  declarations: [
    AppComponent,
    LaunchComponent,
    RiskCalcComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatStepperModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
