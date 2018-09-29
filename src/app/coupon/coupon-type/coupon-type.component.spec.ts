import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponTypeComponent } from './coupon-type.component';

describe('CouponTypeComponent', () => {
  let component: CouponTypeComponent;
  let fixture: ComponentFixture<CouponTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
