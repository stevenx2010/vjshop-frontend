export class ProductImage {
	public id: number = 0;
	public image_url: string = '';
	public product_id: number = 0;
	public position: number = 0;
	public sort_order: number = 0;

	constructor(obj?) {
		if(obj) {
			this.id = obj.id || 0;
			this.image_url = obj.image_url ||'';
			this.product_id = obj.product_id || 0;
			this.position = obj.position || 0;
			this.sort_order = obj.sort_order || 0;
		}
	}
}