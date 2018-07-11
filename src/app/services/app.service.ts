import { Injectable } from '@angular/core';
import SMARTClient = FHIR.SMART.SMARTClient;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public smart: SMARTClient;

  constructor() { }
}
