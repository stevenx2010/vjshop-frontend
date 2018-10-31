import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorInchargeRegionFormComponent } from './distributor-incharge-region-form.component';

describe('DistributorInchargeRegionFormComponent', () => {
  let component: DistributorInchargeRegionFormComponent;
  let fixture: ComponentFixture<DistributorInchargeRegionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorInchargeRegionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorInchargeRegionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
