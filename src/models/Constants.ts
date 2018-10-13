
export const API_BASE_URL = 'http://192.168.1.66:8000/';
export const COLOR_HIGHLIGHT_GREEN = '#33ff56';

export class DiscountMethod {
	public static PERCENTAGE = 1;
	public static VALUE = 2;
	public static FREE_SHIPPING = 3;
}

export class PaymentMethod {
	public static WECHAT = 1;
	public static ALIPAY = 2;
}

export class DeliveryStatus {
	public static NA = 0;
	public static WAITING_FOR_DELIVERY = 1;
	public static IN_DELIVERY = 2;
	public static DELIVERED_NOT_CONFIRM = 3;
	public static CONFIRMED = 4;
}

export class OrderStatus {
	public static NOT_PAY_YET = 1;
	public static PAYED = 2;
	public static RECEIVED = 3;
	public static CLOSED = 4;
	public static CANCELED = 5;
	public static COMMENTED = 6;
	public static NOT_COMMENTED = 7;
}

export class CommentStatus {
	public static NA = 0;
	public static NOT_COMMENTED = 1;
	public static COMMENTED = 2;
}

export class InvoiceStatus {
	public static NA = 0;
	public static NOT_ISSUED = 1;
	public static ISSUED = 2;
}

export class InvoiceType {
	public static PERSONAL = 1;
	public static ENTERPRISE = 2;
}

export class RefundStatus {
	public static NA = -1;
	public static APPLICATION_FOR_REFUND = 1;
	public static WAITING_FOR_REFUND = 2;
	public static REFUNDED = 3;
}

export class SettingType {
	public static SHIPPING_FEE_FORMULA = 1;
}

export class UserRole {
	public static NORMAL_USER			= 0x00000000;
	public static ADMINISTRATOR 		= 0x00000001;
	public static PRODUCT_MANAGER 		= 0x00000010;
	public static DISTRIBUTOR_MANAGER	= 0x00000100;
	public static COUPON_MANAGER		= 0x00001000;
	public static ORDER_MANAGER			= 0x00010000;
	public static INVOICE_MANAGER		= 0x00100000;
	public static PAGE_MANAGER			= 0x01000000;
	public static SETTING_MANAGER		= 0x10000000;
}