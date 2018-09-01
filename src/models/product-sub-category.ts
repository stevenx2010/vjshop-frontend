export class ProductSubCategory {
	public id: number = 0;
	public name: string = '';
	public description: string = '';
	public sort_order: string = '';
	public product_category_id: number = 0;

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.name = obj.name || '';
			this.description = obj.description || '';
			this.sort_order = obj.sort_order || '';
			this.product_category_id = obj.product_category_id || 0;
		}
	}
}