import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorAddressFormComponent } from './distributor-address-form.component';

describe('DistributorAddressFormComponent', () => {
  let component: DistributorAddressFormComponent;
  let fixture: ComponentFixture<DistributorAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
