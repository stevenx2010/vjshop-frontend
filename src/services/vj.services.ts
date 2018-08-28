import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductCategory } from '../models/product-category';
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

	public getProductCategory(): Observable<ProductCategory[]> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.get(API_BASE_URL + 'api/product/categories', {headers: headers})
			.pipe(map((data) => data.json()));
	}

	public swapProductCategorySortOrder(body):Observable<Response> {
		let headers = new Headers();
		this.initAuthHeader(headers);

		return this.http.post(API_BASE_URL + 'api/product/categories/swap', JSON.stringify(body), {headers: headers});
	}
}