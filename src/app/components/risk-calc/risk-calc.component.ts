import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-risk-calc',
  templateUrl: './risk-calc.component.html',
  styleUrls: ['./risk-calc.component.css']
})
export class RiskCalcComponent implements OnInit {
  isLinear = false;
  genderFormGroup: FormGroup;
  ageGroupFormGroup: FormGroup;
  ethnicFormGroup: FormGroup;
  familyFormGroup: FormGroup;
  waistFormGroup: FormGroup;
  bmiFormGroup: FormGroup;
  highBPMedsFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              public appService: AppService) {}


  sexes = [
    {name: 'Female', viewValue: 'female'},
    {name: 'Male', viewValue: 'male'}
  ];

  ageGrps = [
    {name: '49 or younger', viewValue: 'female'},
    {name: '50-59', viewValue: 'male'},
    {name: '60-69', viewValue: 'male'},
    {name: '70 or older', viewValue: 'male'}
  ];

  ngOnInit() {
    this.genderFormGroup = this._formBuilder.group({
      genderCtrl: ['', Validators.required]
    });
    this.ageGroupFormGroup = this._formBuilder.group({
      ageGroupCtrl: ['', Validators.required]
    });
    this.ethnicFormGroup = this._formBuilder.group({
      ethnicCtrl: ['', Validators.required]
    });
    this.familyFormGroup = this._formBuilder.group({
      familyCtrl: ['', Validators.required]
    });
    this.waistFormGroup = this._formBuilder.group({
      waistCtrl: ['', Validators.required]
    });
    this.bmiFormGroup = this._formBuilder.group({
      bmiCtrl: ['', Validators.required]
    });
    this.highBPMedsFormGroup = this._formBuilder.group({
      highBPMedsCtrl: ['', Validators.required]
    });

    const searchParams: FHIR.SMART.ReadParams = {
      type: 'Patient',
      id: this.appService.smart.patient.id,
    };

    const api: FHIR.SMART.Api = this.appService.smart.api;

    // Makes use of the SMART on FHIR JS Client search api method
    api.read(searchParams).then(response => {
      console.log(response);
      }, error => {
      console.log(error);
      });

  }

}
