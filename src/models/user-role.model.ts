export class UserRole {
	public  NORMAL_USER:number			= 0x00000000;
	public  ADMINISTRATOR:number  		= 0x00000001;
	public  PRODUCT_MANAGER:number 		= 0x00000010;
	public  DISTRIBUTOR_MANAGER:number	= 0x00000100;
	public  COUPON_MANAGER:number		= 0x00001000;
	public  ORDER_MANAGER:number		= 0x00010000;
	public  INVOICE_MANAGER:number		= 0x00100000;
	public  PAGE_MANAGER:number			= 0x01000000;
	public  SETTING_MANAGER:number		= 0x10000000;
}

export class Roles {
	public  static NORMAL_USER:number			= 0x00000000;
	public  static ADMINISTRATOR:number  		= 0x00000001;
	public  static PRODUCT_MANAGER:number 		= 0x00000010;
	public  static DISTRIBUTOR_MANAGER:number	= 0x00000100;
	public  static COUPON_MANAGER:number		= 0x00001000;
	public  static ORDER_MANAGER:number		= 0x00010000;
	public  static INVOICE_MANAGER:number		= 0x00100000;
	public  static PAGE_MANAGER:number			= 0x01000000;
	public  static SETTING_MANAGER:number		= 0x10000000;	
}