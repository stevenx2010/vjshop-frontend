import { DiscountMethod } from '../models/constants';

export class Coupon {
	public id: number = 0;
	public name: string = '';
	public description: string = '';
	public coupon_type_id: number = 0;
	public expire_date: string = '';
	public expired: boolean = false;
	public discount_method: number = DiscountMethod.VALUE;
	public discount_percentage: number = 100;
	public discount_value: number = 0;
	public quantity_initial: number = -1;
	public quantity_availabe: number = -1; 		// -1 represents unlimited
	public for_new_comer: boolean = false;
	public min_purchased_amount: number = 0;
	public image_url: string = '';

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.name = obj.name || '';
			this.description = obj.description || '';
			this.coupon_type_id = obj.type_id || 0;
			this.expire_date = obj.expire_date || '';
			this.expired = obj.expired || false;
			this.discount_method = obj.discount_method || DiscountMethod.VALUE;
			this.discount_percentage = obj.discount_percentage || 100;
			this.discount_value = obj.discount_value || 0;
			this.quantity_initial = obj.quantity_initial || -1;
			this.quantity_availabe = obj.quantity_available || -1;
			this.for_new_comer = obj.for_new_comer || false;
			this.min_purchased_amount = obj.min_purchased_amount || 0;
			this.image_url = obj.image_url || '';
		}
	}
}