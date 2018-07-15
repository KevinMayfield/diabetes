import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LaunchComponent } from './components/launch/launch.component';
import { AppRoutingModule } from './app-routing.module';
import { RiskCalcComponent } from './components/risk-calc/risk-calc.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS, MAT_DATE_LOCALE,
  MatButtonModule, MatDatepickerModule,
  MatFormFieldModule, MatGridListModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule, MatSliderModule,
  MatStepperModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RedirectComponent} from "./components/redirect/redirect.component";
import { ObservationCreateComponent } from './components/observation-create/observation-create.component';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import { CovalentLayoutModule, CovalentStepsModule} from "@covalent/core";

@NgModule({
  declarations: [
    AppComponent,
    LaunchComponent,
    RiskCalcComponent,
    RedirectComponent,
    ObservationCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    CovalentLayoutModule,
    CovalentStepsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
