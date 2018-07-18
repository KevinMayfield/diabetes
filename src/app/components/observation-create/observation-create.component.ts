import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ObservationDefinition} from "../../model/observation-definition";
import {} from "@types/fhir";
import {AppService} from "../../services/app.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-observation-create',
  templateUrl: './observation-create.component.html',
  styleUrls: ['./observation-create.component.css']
})
export class ObservationCreateComponent implements OnInit {

  @Input() observationDefinition: ObservationDefinition;

  @Input() observation: fhir.Observation;

  @Output() modified = new EventEmitter<any>();

  @Output() valid = new EventEmitter<any>();

  observationForm : FormGroup;

  valueCtrl: FormControl;

  pickCtrl: FormControl;

  code: string = null;

  constructor(public app: AppService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {


    if (this.observationDefinition.code !== '') {

      // Value Quantity

      console.log('value');

      this.valueCtrl = new FormControl(this.observation.valueQuantity.value);

      this.observationForm = this._formBuilder.group({
        'value' : [this.valueCtrl, Validators.required],
        'effective' : [ new FormControl(this.observation.effectiveDateTime), Validators.required ]
      });
    } else {

      // PickList

      console.log('pick');

      this.pickCtrl = new FormControl(this.code);

      this.observationForm = this._formBuilder.group({
        'pickCtrl' : [this.pickCtrl, Validators.required],
        'effective' : [ new FormControl(this.observation.effectiveDateTime), Validators.required ]
      });

    }


    // force a valid event
    this.change();
  }


  codeSelected(code) {
    //console.log(code.value);

    this.observation.code.coding[0].code = code.value.code;
    this.observation.code.coding[0].display = code.value.display;
    this.change();

  }

  change() {

    this.valid.emit(this.observationForm.valid);

    console.log(this.valid);
  }


}
