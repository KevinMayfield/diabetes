import { Injectable } from '@angular/core';
import SMARTClient = FHIR.SMART.SMARTClient;

import {} from '@types/fhir';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public smart: SMARTClient;

  public patient: fhir.Patient;

  public observations: fhir.Observation[] = [];

  constructor() { }
}
