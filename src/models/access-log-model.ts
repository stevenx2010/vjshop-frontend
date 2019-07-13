import { ACCESS_TYPE } from './constants';

export class AccessLog {
	id: number = 0;
	user: string = '';
	email: string = '';
	module_name: string ='';
	access_type: ACCESS_TYPE = ACCESS_TYPE.MODIFY;
	previous_content: string = '';
	current_content: string = '';
	created_at: string = '';

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.user = obj.user || '';
			this.email = obj.email || '';
			this.module_name = obj.module_name || '';
			this.access_type = obj.access_type || ACCESS_TYPE.MODIFY;
			this.previous_content = obj.previous_content || '';
			this.current_content = obj.current_content || '';
			this.created_at = obj.created_at || '';
		}
	}
}