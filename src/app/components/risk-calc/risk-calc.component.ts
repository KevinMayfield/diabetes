import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {} from '@types/fhir';
import integer = fhir.integer;

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
              public app: AppService) {}

  selectedSex;
  selectedAge;
  selectedEthnic;
  bmi:integer;
  waist:integer;

  sexes = [
    {name: 'Female', viewValue: 'female'},
    {name: 'Male', viewValue: 'male'}
  ];

  ageGrps = [
    {name: '49 or younger', viewValue: 1},
    {name: '50-59', viewValue: 2},
    {name: '60-69', viewValue: 3},
    {name: '70 or older', viewValue: 4}
  ];

  ethnicGrps = [
    {name: 'White European', viewValue: 1},
    {name: 'Other ethnic group', viewValue: 2}
  ];

  familyGrps = [
    {name: 'Yes', viewValue: 1},
    {name: 'No', viewValue: 2}
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
      id: this.app.smart.patient.id,
    };

    const api: FHIR.SMART.Api = this.app.smart.api;

    // Makes use of the SMART on FHIR JS Client search api method
    api.read(searchParams).then(response => {
        console.log(response.data);
        this.app.patient = <fhir.Patient> response.data;
        if (this.app.patient.gender !== undefined) {
          this.selectedSex = this.app.patient.gender;
        }
        let age = this._calculateAge(this.app.patient.birthDate);
        console.log(age);
        switch (true) {
          case (age < 50):
            this.selectedAge = 1;
            break;
          case (age < 60):
            this.selectedAge = 2;
            break;
          case (age < 70):
            this.selectedAge = 3;
            break;
          default:
            this.selectedAge = 4;
        }

        for (let extension of this.app.patient.extension) {
          if (extension.url = 'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-EthnicCategory-1') {
            if (extension.valueCodeableConcept.coding[0].code !== undefined) {
              console.log(extension.valueCodeableConcept.coding[0].code);
              const code =extension.valueCodeableConcept.coding[0].code;
              switch (true) {
                case (code==='A'):
                case (code==='B'):
                case (code.charAt(1)==='C'):
                  this.selectedEthnic =1;
                  break;
                default:
                  this.selectedEthnic=2;
              }
            }
          }
        }
      }, error => {
        console.log(error);
      });

  }

   _calculateAge(birthdayStr) { // birthday is a date
     let birthday = new Date(birthdayStr);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
