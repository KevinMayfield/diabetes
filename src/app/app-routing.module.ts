import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LaunchComponent} from "./launch/launch.component";
import {RiskCalcComponent} from "./risk-calc/risk-calc.component";


const routes: Routes = [
  { path: '', component: RiskCalcComponent },
  { path: 'launch', component: LaunchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
      .forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule {


}
