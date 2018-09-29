import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductCategory } from '../models/product-category';
import { ProductSubCategory } from '../models/product-sub-category';
import { Product } from '../models/product';
import { API_BASE_URL } from '../models/Constants';

@Injectable()
export class VJAPI {
	api_token: string;
	access_token: string;

	public constructor(private http: Http) {}

	/**
	 * Helper: create HTTP request headers
	 */
	private initAuthHeader(headers: Headers) {
		headers.append('Authorization', 'Bearer ' + this.api_token);
		headers.append('X-Acces-Token', this.access_token);
		headers.append('Accept-language', 'en_US');
		headers.append('Content-type', 'application/json');
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

}