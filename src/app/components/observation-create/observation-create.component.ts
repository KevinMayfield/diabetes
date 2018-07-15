import {Component, Input, OnInit, Output} from '@angular/core';
import {ObservationDefinition} from "../../model/observation-definition";
import {} from "@types/fhir";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-observation-create',
  templateUrl: './observation-create.component.html',
  styleUrls: ['./observation-create.component.css']
})
export class ObservationCreateComponent implements OnInit {

  @Input() observationDefinition: ObservationDefinition;

  @Input() observation: fhir.Observation;

  @Output() modified: boolean = false;

  constructor(public app: AppService) { }

  ngOnInit() {


  }

}
