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
}