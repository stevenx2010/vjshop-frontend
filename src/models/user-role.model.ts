export class UserRole {
	public  NORMAL_USER:number			= 0b00000000;
	public  ADMINISTRATOR:number  		= 0b00000001;
	public  PRODUCT_MANAGER:number 		= 0b00000010;
	public  DISTRIBUTOR_MANAGER:number	= 0b00000100;
	public  COUPON_MANAGER:number		= 0b00001000;
	public  ORDER_MANAGER:number		= 0b00010000;
	public  INVOICE_MANAGER:number		= 0b00100000;
	public  PAGE_MANAGER:number			= 0b01000000;
	public  SETTING_MANAGER:number		= 0b10000000;
}

export class Roles {
	public  static NORMAL_USER:number			= 0b00000000;
	public  static ADMINISTRATOR:number  		= 0b00000001;
	public  static PRODUCT_MANAGER:number 		= 0b00000010;
	public  static DISTRIBUTOR_MANAGER:number	= 0b00000100;
	public  static COUPON_MANAGER:number		= 0b00001000;
	public  static ORDER_MANAGER:number			= 0b00010000;
	public  static INVOICE_MANAGER:number		= 0b00100000;
	public  static PAGE_MANAGER:number			= 0b01000000;
	public  static SETTING_MANAGER:number		= 0b10000000;	
}