import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCalcComponent } from './risk-calc.component';

describe('RiskCalcComponent', () => {
  let component: RiskCalcComponent;
  let fixture: ComponentFixture<RiskCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
