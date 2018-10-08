export class Message {
	public id: number = 0;
	public mobile: string = '';
	public message: string = '';
	public who: number = 1; 		// 1: message from user, 2: message from VJ
	public responder: string = '';	// name of VJ employee to answer user's questions
	public updated_at: string = '';

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.mobile = obj.mobile || '';
			this.message = obj.message || '';
			this.who = obj.who || 1;
			this.responder = obj.responder || '';
			this.updated_at = obj.updated_at || '';
		}
	}
}