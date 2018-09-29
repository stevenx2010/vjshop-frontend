import { CouponModule } from './coupon.module';

describe('CouponModule', () => {
  let couponModule: CouponModule;

  beforeEach(() => {
    couponModule = new CouponModule();
  });

  it('should create an instance', () => {
    expect(couponModule).toBeTruthy();
  });
});
