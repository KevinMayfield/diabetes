import {Component, Input, OnInit, Output} from '@angular/core';
import {ObservationDefinition} from "../../model/observation-definition";
import {} from "@types/fhir";
import {AppService} from "../../services/app.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-observation-create',
  templateUrl: './observation-create.component.html',
  styleUrls: ['./observation-create.component.css']
})
export class ObservationCreateComponent implements OnInit {

  @Input() observationDefinition: ObservationDefinition;

  @Input() observation: fhir.Observation;

  @Output() modified: boolean = false;

  observationForm : FormGroup;

  constructor(public app: AppService) { }

  ngOnInit() {
    this.observationForm = new FormGroup({
      'value' : new FormControl(this.observation.valueQuantity.value),
      'effective' : new FormControl(this.observation.effectiveDateTime)
    });

  }

}
