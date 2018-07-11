import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {AppService} from "../../services/app.service";


/**
 * Component which handles the OAuth Token workflow and initializes the SMART Client
 * Initializes the SMART client and redirects to the Home page.
 */
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    public appService: AppService

  ) { }

  /**
   * Callback method when an error occurs during the OAuth2.0 token workflow
   */
  oauth2ReadyErrback = (error: any) => {
    console.log(error);
  }

  /**
   * Callback method once the SMART client has been initialized after the OAuth2.0 token workflow.
   */
  oauth2ReadyCallback = (smartClient: FHIR.SMART.SMARTClient) => {
    console.log(smartClient);
    this.appService.smart = smartClient;
    this._authService.login();
  }

  ngOnInit() {
    // Calling the SMART JS Client ready method to initialize the SMART Client
    FHIR.oauth2.ready(this.oauth2ReadyCallback, this.oauth2ReadyErrback);
  }

}
