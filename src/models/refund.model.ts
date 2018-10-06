export class Refund {
	public id: number = 0;
	public order_id: number = 0;
	public refund_status: number = -1;
	public refund_reason: string = '';
	public refund_amount: number =0.00;
	public refund_date: string ='';
	public approved_by: string = '';
	public audited_by: string = '';

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.order_id = obj.order_id || 0;
			this.refund_status = obj.refund_status || -1;
			this.refund_reason = obj.refund_reason || '';
			this.refund_amount = obj.refund_amount || 0.00;
			this.refund_date = obj.refund_date || '';
			this.approved_by = obj.approved_by || '';
			this.audited_by = obj.audited_by || '';
		}
	}
}