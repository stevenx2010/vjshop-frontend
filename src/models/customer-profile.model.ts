export class CustomerProfile {
	id: number = 0;
	mobile: string = '';
	register_location: string = '';
	register_date: string = '';

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.mobile = obj.mobile || '';
			this.register_date = obj.register_date || '';
			this.register_location = obj.register_location || '';
		}
	}
}