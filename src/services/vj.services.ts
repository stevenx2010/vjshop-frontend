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
	//	headers.append('Content-type', 'application/json');
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

		return this.http.get(API_BASE_URL + 'api/product/categories', {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public getProductCategoryForConsole(): Observable<ProductCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/product/categories/console', {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public swapProductCategorySortOrder(body):Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/product/categories/swap', JSON.stringify(body), {headers: headers});
	}

	public getProductCategoryById(id: number): Observable<ProductCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/categories/' + id, {headers: headers})
			.pipe(map((data) => data.json()));		
	}

	public updateProductCategory(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/product/categories/update', body, {headers: headers});		
	}

	public deleteProductCategoryById(categoryId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/product/categories/delete/' + categoryId, {headers: headers});		
	}


	/**
	 * Product SubCategory Related API
	 */

	public getProductSubCategoriesByProductCategoryId(categoryId: number): Observable<ProductSubCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/product/subcategories/categoryid/' + categoryId, {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public swapProductSubCategorySortOrder(body):Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/product/subcategories/swap', JSON.stringify(body), {headers: headers});
	}

	public updateOrCreateProductSubCategory(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/product/subcategories/update', body, {headers: headers});		
	}

	public getProductSubCategoriesByProductSubCategoryId(subCategoryId: number): Observable<ProductSubCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/product/subcategories/subcategoryid/' + subCategoryId, {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public deleteProductSubCategoryById(subCategoryId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/product/subcategories/delete/' + subCategoryId, {headers: headers});		
	}

	public queryProductCategoryIdBySubCatId(subCatId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/categories/subCatId/' + subCatId, {headers: headers});
	}

	/**
	 * Product  Related API
	 */

	public updateOrCreateProductImages(body): Observable<Response> {
		let headers = new Headers();
		//this.initAuthHeader(headers);
//		headers.append('Content-type', 'multipart/form-data');
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US');
		
		return this.http.post(API_BASE_URL + 'api/product/product/updateImage', body, {headers: headers});		
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
		return this.http.post(API_BASE_URL + 'api/product/product/update', body, {headers: headers});		
	}

	public getProductsBySubCategoryId(subCategoryId: number): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/products/bySubCatId/' + subCategoryId, {headers: headers})
			.pipe(map((data) => data.json()));		
	}

	public deleteProductById(productId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/product/products/delete/' + productId, {headers: headers});		
	}

	public swapProductSortOrder(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/product/products/swap', body, {headers:headers});		
	}

	public queryProductByKeywordAndSubCatId(keyword, subCatId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/query/keyword/' + keyword + '/' + subCatId,  {headers:headers});		
	}

	public queryProductByKeywordAndCatId(keyword, catId): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/query/keyword/' + keyword + '/catid/' + catId,  {headers:headers})
			.pipe(map((data) => data.json()));	
	}

	public queryProductByCategoryId(catId): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/query/categoryId/' + catId,  {headers:headers})
			.pipe(map((data) => data.json()));				
	}

	public queryProductAll(): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/query/all/',  {headers:headers})
			.pipe(map((data) => data.json()));		
	}

	public queryByKeyword(keyword): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/query/keyword/' + keyword,  {headers:headers})
			.pipe(map((data) => data.json()));				
	}

	public queryProductById(productId): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/query/id/' + productId,  {headers:headers})
			.pipe(map((data) => data.json()));				
	}

	public queryProductImagesByProductId(productId): Observable<ProductImage[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/product/images/id/' + productId,  {headers:headers})
			.pipe(map((data) => data.json()));			
	}


	/**
	 * Distributor  Related API
	 */

	public updateDistributorInfo(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/distributor/info/update', body, {headers:headers});				
	}

	public updateDistributorAddress(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/distributor/address/update', body, {headers:headers});					
	}

	public updateDistributorContact(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/distributor/contact/update', body, {headers:headers});					
	}

	public queryDistributorInfo(keyword): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/distributor/info/query/' + keyword, {headers:headers});				
	}

	public queryDistributorInventory(distributorId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/distributor/inventory/query/' + distributorId, {headers:headers});			
	}

	public increateDistributorInventory(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/distributor/inventory/increase', body, {headers:headers});			
	}

	public getDistributors(): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/distributor/distributors', {headers:headers});				
	}

	public deleteDistributor(id: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/distributor/delete/' + id, {headers:headers});				
	}

	public queryDistributorInfoById(id: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/distributor/query/' + id, {headers:headers});						
	}

	public queryDistributorAddressById(addressId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/distributor/address/query/' + addressId, {headers:headers});			
	}

	public deleteDistributorAddressById(addressId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/distributor/address/delete/' + addressId, {headers:headers});			
	}

	public queryDistributorContactById(contactId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/distributor/contact/query/' + contactId, {headers:headers});			
	}

	public deleteDistributorContactByeId(contactId: number): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/distributor/contact/delete/' + contactId, {headers:headers});		
	}

	public queryDistributorInventoryByConditions(body): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/distributor/inventory/query', body, {headers:headers})
			.pipe(map((data) => data.json()));			
	}

	public queryDistributorProductByConditions(body): Observable<Product[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/distributor/product/query', body, {headers:headers})
			.pipe(map((data) => data.json()));			
	}

	/**
	 *  Coupon  Related API
	 */

	public getCouponTypeAll(): Observable<CouponType[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/coupon/type/all', {headers:headers})
				.pipe(map((data) => data.json()));				
	}

	public updateCouponTypeSortOrder(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/coupon/type/update/sort_order', body, {headers:headers});		
	}

	public updateOrCreateCouponType(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/coupon/type/update/coupontype', body, {headers:headers});			
	}

	public queryCouponTypeById($couponTypeId): Observable<CouponType> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/coupon/type/query/id/' + $couponTypeId, {headers:headers})
				.pipe(map((data) => data.json()));						
	}

	public deleteCouponTypeById($couponTypeId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.delete(API_BASE_URL + 'api/coupon/type/delete/id/' + $couponTypeId, {headers:headers});	
	}

	public queryCoupon(params): Observable<Coupon[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/coupon/query/', params, {headers:headers})
			.pipe(map((data) => data.json()));			
	}

	public updateOrCreateCoupon(body): Observable<Response> {
		let headers = new Headers();
	//	this.initAuthHeader(headers);
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US');		
		return this.http.post(API_BASE_URL + 'api/coupon/update', body, {headers: headers});			
	}

	public queryCouponById(couponId): Observable<Coupon[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/coupon/query/id/' + couponId, {headers:headers})
				.pipe(map((data) => data.json()));				
	}

	/**
	 *  Order  Related API
	 */
	public queryOrderByConditions(body): Observable<Order[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/order/query/conditions',body, {headers:headers})
			.pipe(map((data) => data.json()));		
	}

	public queryOrderDetailByOrderId(orderId): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/order/query/detail/id/' + orderId, {headers:headers});	
	}

	public queryOderByConditionsForDistributor(body): Observable<Order[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/order/query/conditions/distributor',body, {headers:headers})
			.pipe(map((data) => data.json()));				
	}


	/**
	 *  Invoice  Related API
	 */

	public updateInvoice(body): Observable<Response> {
		let headers = new Headers();
	//	this.initAuthHeader(headers);
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US')
	
		return this.http.post(API_BASE_URL + 'api/invoice/updateOrCreate',body, {headers:headers});					
	}

	/**
	 *  Refund  Related API
	 */

	public updateRefundInfo(body): Observable<Response> {
		let headers = new Headers();
	//	this.initAuthHeader(headers);
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US')
	
		return this.http.post(API_BASE_URL + 'api/refund/update',body, {headers:headers})		
	}

	public getRefundByOrderId(orderId): Observable<Refund[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/refund/get/' + orderId, {headers:headers})
			.pipe(map((data) => data.json()));			
	}

	/**
	 *  Home Page/New Comer Page  Related API
	 */
	public updateHomePageImages(body): Observable<Response> {
		let headers = new Headers();
	//	this.initAuthHeader(headers);
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US')
	
		return this.http.post(API_BASE_URL + 'api/page/homepage/update',body, {headers:headers})			
	}

	public updateNewComerPage(body): Observable<Response> {
		let headers = new Headers();
	//	this.initAuthHeader(headers);
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT,DELETE, OPTIONS, HEAD');
		headers.append('Access-Control-Allow-Headers', 'Origin, Content-type, X-Auth-Token');
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US')
	
		return this.http.post(API_BASE_URL + 'api/page/newcomerpage/update',body, {headers:headers})				
	}

	/**
	 *  Customer Service Chat Message  Related API
	 */
	public getListOfMessagesByCondition(body): Observable<Message[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.post(API_BASE_URL + 'api/CustomerService/get/', body, {headers:headers})
			.pipe(map((data) => data.json()));					
	}

	public getMessagesByMobile(mobile): Observable<Message[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/CustomerService/message/get/' + mobile, {headers:headers})
			.pipe(map((data) => data.json()));					
	}

	public checkNewMessages(): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);
	
		return this.http.get(API_BASE_URL + 'api/CustomerService/message/checknew/', {headers:headers});		
	}

	 public sendMessage(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/CustomerService/message/update', body, {headers: headers});		 	
	 }

	 public getCountOfNewMessages(): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/CustomerService/get/newcount', {headers: headers});			 	
	 }

	 public getQnA(): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/CustomerService/qna/get/', {headers: headers})	 	
	 }

	 public updateQnA(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/CustomerService/qna/update/', body, {headers: headers})	 		 	
	 }

	 public deleteQnA(id): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/CustomerService/qna/delete/' + id, {headers: headers});	 		 	
	 }

	 public getQnAById(id): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/CustomerService/qna/get/id/' + id, {headers: headers});		 	
	 }

	/**
	 *  User Management  Related API
	 */
	public updateUser(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);

		return this.http.post(API_BASE_URL + 'api/users/new/', body, {headers: headers})			
	}

	public getAllUsers(): Observable<User[]> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/users/getAll', {headers: headers})
			.pipe(map((data) =>data.json()));			
	}

	public deleteUserById(id): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/users/delete/' + id, {headers: headers});				
	}

	public login(body): Observable<Response> {
		let headers = new Headers();
		this.initAuthHeaderForm(headers);

		return this.http.post(API_BASE_URL + 'api/users/login', body, {headers: headers});			
	}

	public updatePassword(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeaderForm(headers);

		return this.http.post(API_BASE_URL + 'api/users/update/password', body, {headers: headers});			
	}

	public checkEmailUnique(email): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/users/email/unique/' + email, {headers: headers});
	}

	/**
	 *  Setting  Related API
	 */

	public getShippingSettingsAll(): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/setting/shipping/get/all', {headers: headers});		
	}

	public updateShippingSettings(body): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeaderForm(headers);

		return this.http.post(API_BASE_URL + 'api/setting/shipping/update', body, {headers: headers});			
	}

	public deleteShippingSettingById(id): Observable<Response> {
		let headers = new Headers();
	 	this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/setting/shipping/delete/' + id, {headers: headers});				
	}
}