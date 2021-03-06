import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {} from '@types/fhir';
import {ObservationDefinition} from "../../model/observation-definition";
import {StepState, TdStepComponent} from "@covalent/core";
import { v4 as uuid } from 'uuid';
import Bundle = FHIR.SMART.Bundle;
import Entry = FHIR.SMART.Entry;


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

  @ViewChild('stepGender')
  private stepGender: TdStepComponent;

  @ViewChild('stepAge')
  private stepAge: TdStepComponent;

  @ViewChild('stepEthnic')
  private stepEthnic: TdStepComponent;

  @ViewChild('stepFamily')
  private stepFamily: TdStepComponent;

  @ViewChild('stepWaist')
    private stepWaist: TdStepComponent;

  @ViewChild('stepBMI')
  private stepBMI: TdStepComponent;

  @ViewChild('stepBPMed')
  private stepBPMed: TdStepComponent;

  @ViewChild('stepDone')
  private stepDone: TdStepComponent;

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

  obs: fhir.Observation[] = [];

  obsDef: ObservationDefinition[] = [
    {
      display: 'Body Weight',
      code: '27113001',
      units: 'kg',
      relatedcodes: [
        '27113001','364589006'
      ],
      pickList: []
    },
    {
      display: 'Body Height',
      code: '50373000',
      units: 'm',
      relatedcodes: [
        '50373000'
      ],
      pickList: []

    },
    {
      display: 'Body Mass Index',
      code: '60621009',
      units: 'kg/m2',
      relatedcodes: [
        '60621009'
      ],
      pickList: []
    },
    {
      display: 'Waist Circumference',
      code: '276361009',
      units: 'cm',
      relatedcodes: [
        '276361009'
      ],
      pickList: []
    },
    {
      display: 'Family History of Diabetes',
      code: '',
      units: '',
      relatedcodes: [
        '160303001' , '160274005'
      ],
      pickList: [
        {
           code: '160303001',
           display: 'Yes' //'Family history: Diabetes mellitus'
        },
        {
          code: '160274005',
          display: 'No family history diabetes'
        }
      ]
    },
  ];

  ngOnInit() {

    for(let obsDef of this.obsDef) {
      const observation: fhir.Observation = {
        status: 'final',
        code: {
          coding: [
            {
              "system": "http://snomed.info/sct",
              "code": obsDef.code,
              "display": obsDef.display
            }
          ]
        },
        subject: {
          "reference": ''
        }

      };

      if (obsDef.code !== '') {
        observation.valueQuantity =  {
          "unit": obsDef.units,
            "system": "http://unitsofmeasure.org",
            "code": obsDef.units
        }
      }

      let now = new Date().toISOString();
      observation.effectiveDateTime = now;
      this.obs.push(observation);
    }

    this.genderFormGroup = this._formBuilder.group({
      genderCtrl: ['', Validators.required]
    });
    this.ageGroupFormGroup = this._formBuilder.group({
      ageGroupCtrl: ['', Validators.required]
    });

    this.ethnicFormGroup = this._formBuilder.group({
      ethnicCtrl: ['', Validators.required]
    });
    this.ethnicFormGroup.valueChanges.subscribe(val => {
       // console.log(val);
        this.stepEthnic.state = StepState.Complete;
        this.setActive();
      }
      );


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
    this.highBPMedsFormGroup.valueChanges.subscribe(val => {
       // console.log(val);
        this.stepBPMed.state = StepState.Complete;
        this.setActive();
      }
    );

    const searchParams: FHIR.SMART.ReadParams = {
      type: 'Patient',
      id: this.app.smart.patient.id
    };

    const api: FHIR.SMART.Api = this.app.smart.api;

    // Makes use of the SMART on FHIR JS Client search api method
    api.read(searchParams).then(response => {
       // console.log(response.data);
        this.app.patient = <fhir.Patient> response.data;
        if (this.app.patient.gender !== undefined) {
          this.selectedSex = this.app.patient.gender;
          this.stepGender.state = StepState.Complete;
        }
        let age = this._calculateAge(this.app.patient.birthDate);
       // console.log(age);
        switch (true) {
          case (age < 50):
            this.selectedAge = 1;
            this.stepAge.state = StepState.Complete;
            break;
          case (age < 60):
            this.selectedAge = 2;
            this.stepAge.state = StepState.Complete;
            break;
          case (age < 70):
            this.selectedAge = 3;
            this.stepAge.state = StepState.Complete;
            break;
          default:
            this.selectedAge = 4;
            this.stepAge.state = StepState.Complete;


        }
        if (this.app.patient.extension !== undefined ) {
          for (let extension of this.app.patient.extension) {
            if (extension.url = 'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-EthnicCategory-1') {
              if (extension.valueCodeableConcept.coding[0].code !== undefined) {
             //   console.log(extension.valueCodeableConcept.coding[0].code);
                const code =extension.valueCodeableConcept.coding[0].code;
                switch (true) {
                  case (code==='A'):
                  case (code==='B'):
                  case (code.charAt(1)==='C'):
                    this.selectedEthnic =1;
                    this.stepEthnic.state = StepState.Complete;

                    break;
                  default:
                    this.selectedEthnic=2;
                    this.stepEthnic.state = StepState.Complete;
                }
              }

            }
          }
        }
        this.setActive();
      }, error => {
        console.log(error);
      });


    const obsSearchParams: FHIR.SMART.SearchParams = {
      type: 'Observation',
      query: {
        code: {
          $or: [
          ]
        },
        patient: this.app.smart.patient.id
      }
    };
    /*
    'http://snomed.info/sct|27113001', // weight
            'http://snomed.info/sct|364589006', // weight
            'http://snomed.info/sct|50373000', // Body height
            'http://snomed.info/sct|276361009', // waist circumference
            'http://snomed.info/sct|160303001', // family history diabetes (add child codes?)
            'http://snomed.info/sct|60621009' // Body Mass Index
     */
    for (let obsDef of this.obsDef) {
      for (let code of obsDef.relatedcodes) {
        obsSearchParams.query.code.$or.push('http://snomed.info/sct|'+code);
      }
      for(let code of obsDef.pickList) {
        obsSearchParams.query.code.$or.push('http://snomed.info/sct|'+code.code);
      }
    }
    api.search(obsSearchParams).then(response => {
        const bundle: fhir.Bundle = <fhir.Bundle> response.data;
        console.log('obs search response');
        if (bundle.entry !== undefined) {
          for (let entry of bundle.entry) {
           // console.log('added observation');
            let observation: fhir.Observation = <fhir.Observation> entry.resource;
            this.app.observations.push(observation);
            if (observation.code !== undefined && observation.code.coding !== undefined) {
              for (let i in this.obsDef) {

                // used 'in' above so need def

                let obsDef = this.obsDef[i];
                for (let code of obsDef.relatedcodes) {
                  if (observation.code.coding[0].code === code && observation.valueQuantity !== undefined) {
                   // console.log('Found Observation');
                   // console.log(observation);
                   // console.log(this.obs[i]);
                    this.obs[i].effectiveDateTime = observation.effectiveDateTime;
                    this.obs[i].valueQuantity.value = observation.valueQuantity.value ;
                  }
                }
              }
            }
          }
        }

    }, error => {
      console.log('oopsie ' + error);
    });
  }


  setActive() {
    if (this.stepGender.state !== StepState.Complete) {
      this.stepGender.active = true;
    } else if (this.stepAge.state !== StepState.Complete) {
      this.stepAge.active = true;
    } else if (this.stepEthnic.state !== StepState.Complete) {
      this.stepEthnic.active = true;
    } else if (this.stepFamily.state !== StepState.Complete) {
      this.stepEthnic.active = true;
    } else if (this.stepWaist.state !== StepState.Complete) {
      this.stepWaist.active = true;
    } else if (this.stepBMI.state !== StepState.Complete) {
      this.stepBMI.active = true;
    } else if (this.stepBPMed.state !== StepState.Complete) {
      this.stepBPMed.active = true;
    } else {
      this.stepDone.active = true;
    }
  }


   _calculateAge(birthdayStr) { // birthday is a date
     let birthday = new Date(birthdayStr);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  checkValidBMI(event) {
    if (event !== undefined) console.log('bmi '+event);

    let validState = true;

    console.log(this.obs[0]);
    if (this.obs[0].effectiveDateTime === null || this.obs[0].valueQuantity.value === null) {
      validState = false;
      console.log('weight not valid');
    }
    if (this.obs[1].effectiveDateTime === null|| this.obs[1].valueQuantity.value === null) {
      validState = false;
      console.log('height not valid');
    }
    if (this.obs[2].effectiveDateTime === null || this.obs[2].valueQuantity.value === null) {
      console.log('bmo not valid');
      if (validState) {
        this.obs[2].effectiveDateTime = new Date().toISOString();
        this.obs[2].valueQuantity.value = Math.round(this.obs[0].valueQuantity.value / (this.obs[1].valueQuantity.value * this.obs[1].valueQuantity.value));
      } else {
        validState = false;
      }
    }

    if (validState) {

      this.stepBMI.state = StepState.Complete;
    } else {
      console.log('Section not valid');
      this.stepBMI.state = StepState.None;
    }
    //this.setActive();
  }

  checkValidFamily(event) {
    if (event !== undefined) console.log('family '+event);
    if (event) {
      this.stepFamily.state = StepState.Complete;
    } else {
      this.stepFamily.state = StepState.None;
    }
    this.setActive();
  }

  checkValidWaist(event) {
    if (event !== undefined) console.log('waist '+event);
    if (event) {
      this.stepWaist.state = StepState.Complete;
    } else {
      this.stepWaist.state = StepState.None;
    }
   this.setActive();
  }

  onSave() {

    const api: FHIR.SMART.Api = this.app.smart.api;

    let bundle: fhir.Bundle = {
      type: 'collection',
      entry: []
    };

    let patient = this.app.patient;
    patient.id = uuid();
    let entry: fhir.BundleEntry = {
      fullUrl: 'urn:uuid:'+ patient.id,
      resource: patient
    };

    entry.resource.resourceType = 'Patient';
    bundle.entry.push(entry);

    for (let obs of this.obs) {
      obs.id = uuid();

      obs.subject.reference = 'urn:uuid:'+ patient.id;
      let entry: fhir.BundleEntry = {
        fullUrl: 'urn:uuid:'+ obs.id,
        resource: obs
      };
      entry.resource.resourceType = 'Observation';
      bundle.entry.push(entry);
    }

    let smartBundle: Entry = {
      resource: <any>bundle };
    smartBundle.resource.resourceType = 'Bundle';

    api.create(smartBundle).then(
      response => {
        console.log(response);
      }
      , error => {
        console.log(error);
        console.log('error ^');
      }
    );

  }

}
