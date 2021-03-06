export class DistributorAddress {
	public id: number = 0;
	public distributor_id: number =0;
	public city: string = '';
	public street: string = '';
	public default_address: boolean = false;

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.distributor_id = obj.distributor_id || 0;
			this.city = obj.city || '';
			this.street = obj.street || '';
			this.default_address = obj.default_address || false;
		}
	}
}