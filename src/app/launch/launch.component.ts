import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {

  iss: string;

  launch: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.iss = this.activatedRoute.snapshot.queryParams['iss'];

    this.launch = this.activatedRoute.snapshot.queryParams['launch'];
  }

}
