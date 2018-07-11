import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import SMARTClient = FHIR.SMART.SMARTClient;
import {AppService} from "../../services/app.service";


@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})



export class LaunchComponent implements OnInit {

  iss: string;

  launch: string;

  public conformance: any = {};



  constructor(private activatedRoute: ActivatedRoute,
              public appService : AppService) { }

  ngOnInit() {

    this.iss = this.activatedRoute.snapshot.queryParams['iss'];

    this.launch = this.activatedRoute.snapshot.queryParams['launch'];


    const clientSettings = {
      client_id: 'diabetes',
      // Adding the scopes launch or launch/patient depending upon the SMART on FHIR Launch sequence
      scope: 'user/*.read launch openid profile',
      redirect_uri: 'http://localhost:4202/redirect',
      state: '12312'
    };

    const oauth2Configuration = {
      client: clientSettings,
      server: this.iss
    };
    // The authorize method of the SMART on FHIR JS client, will take care of completing the OAuth2.0 Workflow
    FHIR.oauth2.authorize(oauth2Configuration, (authError) => {
      console.log(authError);
    });
  }

}
