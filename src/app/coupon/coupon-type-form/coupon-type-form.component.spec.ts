import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponTypeFormComponent } from './coupon-type-form.component';

describe('CouponTypeFormComponent', () => {
  let component: CouponTypeFormComponent;
  let fixture: ComponentFixture<CouponTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
