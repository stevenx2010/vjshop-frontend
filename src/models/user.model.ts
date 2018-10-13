export class User {
	public id: number = 0;
	public name: string = '';
	public mobile: string = '';
	public email: string = '';
	public password: string ='';
	public api_token: string = '';
	public image_url: string = '';
	public roles: number = 0;
	public first_login: boolean = true;
	public last_login: string = '';

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.name = obj.name || '';
			this.mobile = obj.mobile || '';
			this.email = obj.email || '';
			this.password = obj.password || '';
			this.api_token = obj.api_token || '';
			this.image_url = obj.image_url || '';
			this.roles = obj.roles || 0;
			this.first_login = obj.first_login || true;
			this.last_login = obj.last_login || '';
		}
	}
}