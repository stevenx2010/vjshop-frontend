export class Invoice {
	public id: number = 0;
	public order_id: number = 0;
	public invoice_number: string ='';
	public invoice_amount: number = 0.00;
	public issued_date: string = '';
	public issued_by: string = '';
	public audited_by: string = '';
	public approved_by: string = '';
	public image_url: string = '';

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.order_id = obj.order_id || 0;
			this.invoice_number = obj.invoice_number || '';
			this.invoice_amount = obj.invoice_amount || '';
			this.issued_date = obj.issued_date || '';
			this.issued_by = obj.issued_by || '';
			this.audited_by = obj.audited_by || '';
			this.approved_by = obj.approved_by || '';
			this.image_url = obj.image_url || '';
		}
	}
}