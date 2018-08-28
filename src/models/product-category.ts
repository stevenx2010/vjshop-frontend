export class ProductCategory {
	public id: number = 0;
	public name: string = '';
	public description: string = '';
	public sort_order: number = 0;

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.name = obj.name || '';
			this.description = obj.description || '';
			this.sort_order = obj.sort_order ||0;
		}
	}
}