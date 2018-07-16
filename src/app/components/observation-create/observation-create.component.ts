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

  code: string;

  codeCtrl: FormControl;

  valueCtrl: FormControl;

  constructor(public app: AppService) { }

  ngOnInit() {

    this.codeCtrl = new FormControl(this.code);
    this.codeCtrl.setValue({
      ///
    });

    if (this.observationDefinition.code !== '') {
      this.valueCtrl = new FormControl(this.observation.valueQuantity.value);
    } else {
      this.valueCtrl = new FormControl();
    }


    this.observationForm = new FormGroup({
      'value' : this.valueCtrl,
      'code' : this.codeCtrl,
      'effective' : new FormControl(this.observation.effectiveDateTime)
    });

  }


  codeSelected(code) {
    console.log(code.value);

    this.observation.code.coding[0].code = code.value.code;
    this.observation.code.coding[0].display = code.value.display;

  }


}
