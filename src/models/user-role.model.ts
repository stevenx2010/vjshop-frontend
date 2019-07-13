export class UserRole {
	public  NORMAL_USER:number			= 0b000000000;
	public  ADMINISTRATOR:number  		= 0b000000001;
	public  PRODUCT_MANAGER:number 		= 0b000000010;
	public  DISTRIBUTOR_MANAGER:number	= 0b000000100;
	public  COUPON_MANAGER:number		= 0b000001000;
	public  ORDER_MANAGER:number		= 0b000010000;
	public  INVOICE_MANAGER:number		= 0b000100000;
	public  PAGE_MANAGER:number			= 0b001000000;
	public  SETTING_MANAGER:number		= 0b010000000;
	public  PRICE_MANAGER:number		= 0b100000000;
}

export class Roles {
	public  static NORMAL_USER:number			= 0b000000000;
	public  static ADMINISTRATOR:number  		= 0b000000001;
	public  static PRODUCT_MANAGER:number 		= 0b000000010;
	public  static DISTRIBUTOR_MANAGER:number	= 0b000000100;
	public  static COUPON_MANAGER:number		= 0b000001000;
	public  static ORDER_MANAGER:number			= 0b000010000;
	public  static INVOICE_MANAGER:number		= 0b000100000;
	public  static PAGE_MANAGER:number			= 0b001000000;
	public  static SETTING_MANAGER:number		= 0b010000000;	
	public  static PRICE_MANAGER:number			= 0b100000000;
}