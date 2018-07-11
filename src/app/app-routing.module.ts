import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LaunchComponent} from "./components/launch/launch.component";
import {RiskCalcComponent} from "./components/risk-calc/risk-calc.component";
import {RedirectComponent} from "./components/redirect/redirect.component";


const routes: Routes = [
  { path: '', component: RiskCalcComponent },
  { path: 'launch', component: LaunchComponent },
  { path: 'redirect', component: RedirectComponent }
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
