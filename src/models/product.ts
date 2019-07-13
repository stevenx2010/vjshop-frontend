export class Product {
	public id: number = 0;
	public name: string = '';
	public description: string = '';
	public product_sub_category_id: number = 0;
	public product_sub_category_name: string = '';
	public model: string = '';
	public package_unit: string = '';
	public weight: number = 0;
	public weight_unit: string = '';
	public price: number = 0;
	public brand: string = '';
	public package: string = '';
	public coating: string = '';
	public quality: string = '';
	public inventory: number = 0;
	public thumbnail_url: string = '';
	public sold_amount:number = 0;
	public off_shelf: boolean = false;
	public sort_order: number = 999;

	constructor(obj?) {
		if(obj) {
			this.name = obj.name || '';
			this.description = obj.description || '';
			this.product_sub_category_id = obj.product_sub_category || 0;
			this.product_sub_category_name = obj.product_sub_category_name || '';
			this.model = obj.model || '';
			this.package_unit = obj.package_unit || '';
			this.weight = obj.weight || 0;
			this.weight_unit = obj.weight_unitj || '';
			this.price = obj.price || 0;
			this.brand = obj.brand || '';
			this.package = obj.package || '';
			this.coating = obj.coating || '';
			this.quality = obj.quality || '';
			this.inventory = obj.inventory || 0;
			this.thumbnail_url = obj.thumbnail_url || '';
			this.sold_amount = obj.sold_amount || 0;
			this.off_shelf = obj.off_shelf || false;
			this.sort_order = obj.sort_order || 999;
	}	
	}
}