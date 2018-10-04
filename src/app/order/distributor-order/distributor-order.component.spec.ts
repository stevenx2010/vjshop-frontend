import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorOrderComponent } from './distributor-order.component';

describe('DistributorOrderComponent', () => {
  let component: DistributorOrderComponent;
  let fixture: ComponentFixture<DistributorOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
