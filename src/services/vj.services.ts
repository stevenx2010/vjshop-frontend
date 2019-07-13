import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductCategory } from '../models/product-category';
import { ProductSubCategory } from '../models/product-sub-category';
import { Product } from '../models/product';
import { ProductImage } from '../models/product-image-model';
import { API_BASE_URL } from '../models/constants';
import { CouponType } from '../models/coupon-type.model';
import { Coupon } from '../models/coupon.model';
import { Order } from '../models/order.model';
import { Refund } from '../models/refund.model';

import { Message } from '../models/message.model';
import { User } from '../models/user.model';

import { CustomerProfile } from '../models/customer-profile.model';
import { AccessLog } from '../models/access-log-model';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class VJAPI {
	api_token: string;
	access_token: string;

	public constructor(private http: Http, private cs: CookieService) {

	}

	/**
	 * Helper: create HTTP request headers
	 */
	private initAuthHeader(headers: Headers) {
		if(this.api_token === undefined || this.api_token == null || (this.api_token && this.api_token.length == 0 )) {
			console.log(this.cs.get('token'));
			if(this.cs.check('token')) {
				this.api_token = this.cs.get('token');
				console.log(this.api_token);
			}
		}
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US');
		headers.append('Content-type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
	}
	/**
	 * Helper: create HTTP request headers form submit
	 */
	private initAuthHeaderForm(headers: Headers) {
		if(this.api_token === undefined || this.api_token == null || (this.api_token && this.api_token.length == 0 )) {
			console.log(this.cs.get('token'));
			if(this.cs.check('token')) {
				this.api_token = this.cs.get('token');
				console.log(this.api_token);
			}
		}
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US');
//		headers.append('Content-type', 'application/x-www-form-urlencoded');
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
	}

	/**
	 * Product Category Related API
	 */
	public getProductCategory(): Observable<ProductCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/product/categories', {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public getProductCategoryForConsole(): Observable<ProductCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/product/categories/console', {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public swapProductCategorySortOrder(body):Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/front/product/categories/swap', JSON.stringify(body), {headers: headers});
	}

	public getProductCategoryById(id: number): Observable<ProductCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/categories/' + id, {headers: headers})
			.pipe(map((data) => data.json()));		
	}

	public updateProductCategory(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/product/categories/update', body, {headers: headers});		
	}

	public deleteProductCategoryById(categoryId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/product/categories/delete/' + categoryId, {headers: headers});		
	}


	/**
	 * Product SubCategory Related API
	 */

	public getProductSubCategoriesByProductCategoryId(categoryId: number): Observable<ProductSubCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/product/subcategories/categoryid/' + categoryId, {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public swapProductSubCategorySortOrder(body):Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/front/product/subcategories/swap', JSON.stringify(body), {headers: headers});
	}

	public updateOrCreateProductSubCategory(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/front/product/subcategories/update', body, {headers: headers});		
	}

	public getProductSubCategoriesByProductSubCategoryId(subCategoryId: number): Observable<ProductSubCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/product/subcategories/subcategoryid/' + subCategoryId, {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public deleteProductSubCategoryById(subCategoryId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/product/subcategories/delete/' + subCategoryId, {headers: headers});		
	}

	public queryProductCategoryIdBySubCatId(subCatId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/categories/subCatId/' + subCatId, {headers: headers});
	}

	/**
	 * Product  Related API
	 */

	public updateOrCreateProductImages(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	/*	headers.append('Content-type', 'multipart/form-data');
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US');*/
		
		return this.http.post(API_BASE_URL + 'api/front/product/product/updateImage', body, {headers: headers});		
	}

	public updateOrCreateProduct(body): Observable<Response> {
		let headers = new Headers();
	//	this.initAuthHeader(headers);
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US');		
		return this.http.post(API_BASE_URL + 'api/front/product/product/update', body, {headers: headers});		
	}

	public getProductsBySubCategoryId(subCategoryId: number): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/products/bySubCatId/' + subCategoryId, {headers: headers})
			.pipe(map((data) => data.json()));		
	}

	public deleteProductById(productId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/product/products/delete/' + productId, {headers: headers});		
	}

	public swapProductSortOrder(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/product/products/swap', body, {headers:headers});		
	}

	public queryProductByKeywordAndSubCatId(keyword, subCatId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/query/keyword/' + keyword + '/' + subCatId,  {headers:headers});		
	}

	public queryProductByKeywordAndCatId(keyword, catId): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/query/keyword/' + keyword + '/catid/' + catId,  {headers:headers})
			.pipe(map((data) => data.json()));	
	}

	public queryProductByCategoryId(catId): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/query/categoryId/' + catId,  {headers:headers})
			.pipe(map((data) => data.json()));				
	}

	public queryProductAll(): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/query/all/',  {headers:headers})
			.pipe(map((data) => data.json()));		
	}

	public queryByKeyword(keyword): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/query/keyword/' + keyword,  {headers:headers})
			.pipe(map((data) => data.json()));				
	}

	public queryProductById(productId): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/query/id/' + productId,  {headers:headers})
			.pipe(map((data) => data.json()));				
	}

	public queryProductImagesByProductId(productId): Observable<ProductImage[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/product/images/id/' + productId,  {headers:headers})
			.pipe(map((data) => data.json()));			
	}


	/**
	 * Distributor  Related API
	 */

	public updateDistributorInfo(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/distributor/info/update', body, {headers:headers});				
	}

	public updateDistributorAddress(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/distributor/address/update', body, {headers:headers});					
	}

	public updateDistributorContact(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/distributor/contact/update', body, {headers:headers});					
	}

	public queryDistributorInfo(keyword): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/distributor/info/query/' + keyword, {headers:headers});				
	}

	public queryDistributorInventory(distributorId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/distributor/inventory/query/' + distributorId, {headers:headers});			
	}

	public increateDistributorInventory(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/distributor/inventory/increase', body, {headers:headers});			
	}

	public getDistributors(): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/distributor/distributors', {headers:headers});				
	}

	public deleteDistributor(id: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/distributor/delete/' + id, {headers:headers});				
	}

	public queryDistributorInfoById(id: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/distributor/query/' + id, {headers:headers});						
	}

	public queryDistributorAddressById(addressId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/distributor/address/query/' + addressId, {headers:headers});			
	}

	public deleteDistributorAddressById(addressId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/distributor/address/delete/' + addressId, {headers:headers});			
	}

	public queryDistributorContactById(contactId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/distributor/contact/query/' + contactId, {headers:headers});			
	}

	public deleteDistributorContactByeId(contactId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/distributor/contact/delete/' + contactId, {headers:headers});		
	}

	public queryDistributorInventoryByConditions(body): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/distributor/inventory/query', body, {headers:headers})
			.pipe(map((data) => data.json()));			
	}

	public queryDistributorProductByConditions(body): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/distributor/product/query', body, {headers:headers})
			.pipe(map((data) => data.json()));			
	}

	public updateDistributorInchargeRegions(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/distributor/incharge/region/update', body,{headers:headers});				
	}

	public getDistributorInchargeRegions(distributorId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/distributor/incharge/region/get/' + distributorId,{headers:headers});			
	}

	public deleteDistributorInchargeRegions(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/distributor/incharge/region/delete', body, {headers:headers});			
	}

	/**
	 *  Coupon  Related API
	 */

	public getCouponTypeAll(): Observable<CouponType[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/coupon/type/all', {headers:headers})
				.pipe(map((data) => data.json()));				
	}

	public updateCouponTypeSortOrder(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/coupon/type/update/sort_order', body, {headers:headers});		
	}

	public updateOrCreateCouponType(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/coupon/type/update/coupontype', body, {headers:headers});			
	}

	public queryCouponTypeById($couponTypeId): Observable<CouponType> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/coupon/type/query/id/' + $couponTypeId, {headers:headers})
				.pipe(map((data) => data.json()));						
	}

	public deleteCouponTypeById($couponTypeId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/coupon/type/delete/id/' + $couponTypeId, {headers:headers});	
	}

	public queryCoupon(params): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/coupon/query', params, {headers:headers});			
	}

	public updateOrCreateCoupon(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/coupon/update', body, {headers: headers});			
	}

	public queryCouponById(couponId): Observable<Coupon[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/coupon/query/id/' + couponId, {headers:headers})
				.pipe(map((data) => data.json()));				
	}

	public deleteCouponById($couponId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/coupon/delete/id/' + $couponId, {headers:headers});			
	}

	/**
	 *  Order  Related API
	 */
	public queryOrderByConditions(body): Observable<Order[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/order/query/conditions',body, {headers:headers})
			.pipe(map((data) => data.json()));		
	}

	public queryOrderDetailByOrderId(orderId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/order/query/detail/id/' + orderId, {headers:headers});	
	}

	public queryOderByConditionsForDistributor(body): Observable<Order[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/order/query/conditions/distributor',body, {headers:headers})
			.pipe(map((data) => data.json()));				
	}

	public changeOrderPrice(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/order/change/price',body, {headers:headers});		
	}

	public queryOrderPriceChangeHistory(body):Observable<AccessLog[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/order/price/change/history',body, {headers:headers})
			.pipe(map((data) => data.json()));			
	}

	/**
	 *  Invoice  Related API
	 */

	public updateInvoice(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/invoice/updateOrCreate',body, {headers:headers});					
	}

	/**
	 *  Refund  Related API
	 */

	public updateRefundInfo(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/refund/update',body, {headers:headers})		
	}

	public getRefundByOrderId(orderId): Observable<Refund[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/refund/get/' + orderId, {headers:headers})
			.pipe(map((data) => data.json()));			
	}

	/**
	 *  Home Page, New Comer Page, Agreemnet Page  Related API
	 */
	public updateHomePageImages(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/page/homepage/update',body, {headers:headers})			
	}

	public deleteVideoOnHomePage(): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	
		return this.http.delete(API_BASE_URL + 'api/front/page/homepage/video/delete', {headers:headers})					
	}

	public updateNewComerPage(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/page/newcomerpage/update',body, {headers:headers})				
	}

	public getAgreement(): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/page/get/agreement', {headers:headers});			
	}

	public updateAgreement(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/page/agreement/update',body, {headers:headers})		
	}

	/**
	 *  Customer Service Chat Message  Related API
	 */
	public getListOfMessagesByCondition(body): Observable<Message[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/CustomerService/get', body, {headers:headers})
			.pipe(map((data) => data.json()));					
	}

	public getMessagesByMobile(mobile): Observable<Message[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/CustomerService/message/get/' + mobile, {headers:headers})
			.pipe(map((data) => data.json()));					
	}

	public checkNewMessages(): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/front/CustomerService/message/checknew', {headers:headers});		
	}

	 public sendMessage(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/front/CustomerService/message/update', body, {headers: headers});		 	
	 }

	 public getCountOfNewMessages(): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/front/CustomerService/get/newcount', {headers: headers});			 	
	 }

	 public getQnA(): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/CustomerService/qna/get', {headers: headers})	 	
	 }

	 public updateQnA(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/front/CustomerService/qna/update', body, {headers: headers})	 		 	
	 }

	 public deleteQnA(id): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/CustomerService/qna/delete/' + id, {headers: headers});	 		 	
	 }

	 public getQnAById(id): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/CustomerService/qna/get/id/' + id, {headers: headers});		 	
	 }


	/**
	 *  Customer Service Chat Message  Related API
	 */
	 public getCustomerProfile(body): Observable<CustomerProfile[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/front/CustomerManage/profile', body, {headers:headers})
				.pipe(map((data) => data.json()));		
	 }

	/**
	 *  User Management  Related API
	 */
	public updateUser(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);

		return this.http.post(API_BASE_URL + 'api/front/users/new', body, {headers: headers})			
	}

	public getAllUsers(): Observable<User[]> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/users/getAll', {headers: headers})
			.pipe(map((data) =>data.json()));			
	}

	public deleteUserById(id): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/users/delete/' + id, {headers: headers});				
	}

	public login(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);

		return this.http.post(API_BASE_URL + 'api/front/users/login', body, {headers: headers});			
	}

	public updatePassword(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeaderForm(headers);

		return this.http.post(API_BASE_URL + 'api/front/users/update/password', body, {headers: headers});			
	}

	public checkEmailUnique(email): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/users/email/unique/' + email, {headers: headers});
	}

	public updateUserRoles(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/front/users/roles/update', body, {headers: headers});		
	}

	/**
	 *  Setting  Related API
	 */

	public getShippingSettingsAll(): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/setting/shipping/get/all', {headers: headers});		
	}

	public updateShippingSettings(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeaderForm(headers);

		return this.http.post(API_BASE_URL + 'api/front/setting/shipping/update', body, {headers: headers});			
	}

	public deleteShippingSettingById(id): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/front/setting/shipping/delete/' + id, {headers: headers});				
	}
}