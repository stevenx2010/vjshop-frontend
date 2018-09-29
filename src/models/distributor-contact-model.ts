export class DistributorContact {
	public id: number = 0;
	public name: string = '';
	public mobile: string = '';
	public phone_area_code: string = '';
	public telephone: string = '';
	public distributor_id: number = 0;
	public default_contact: boolean = false;

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.name = obj.name || '';
			this.mobile = obj.mobile || '';
			this.phone_area_code = obj.phone_area_code || '';
			this.telephone = obj.telephone || '';
			this.distributor_id = obj.distributor_id || 0;
			this.default_contact = obj.default_contact || 0;
		}
	}
}