import { Component, OnInit } from '@angular/core';

import { VJAPI } from '../../../services/vj.services';
import { Distributor } from '../../../models/distributor.model';
import { ProductCategory } from '../../../models/product-category';
import { ProductSubCategory } from '../../../models/product-sub-category';
import { Product } from '../../../models/product';
import { API_BASE_URL } from '../../../models/Constants';

@Component({
  selector: 'app-distributor-inventory-form',
  templateUrl: './distributor-inventory-form.component.html',
  styleUrls: ['./distributor-inventory-form.component.css']
})
export class DistributorInventoryFormComponent implements OnInit {

  baseUrl: string = API_BASE_URL;

  keyword: string;
  keywordProduct: string = '';
  distributorName: string;
  subCategoryId: number;
  distributorId: number;
  productId: number;

  distributors: Distributor[];
  productCategories: ProductCategory[];
  productSubCategories: ProductSubCategory[];
  products: Product[];
  inventories: number[];
  productInventories: Product[]

  tableDisplay: boolean = false;
  productShow: boolean = false;
  inputQueryDisabled: boolean = true;
  saveBtnDisabled: boolean = true;

  constructor(private vjApi: VJAPI) { 
  	this.distributors = new Array<Distributor>();
  	this.productCategories = new Array<ProductCategory>();
  	this.productSubCategories = new Array<ProductSubCategory>();
    this.products = new Array<Product>();
    this.inventories = new Array<number>();
    this.productInventories = new Array<Product>();
  }

  ngOnInit() {
  	this.vjApi.getProductCategory().subscribe((data) => {
  		if(data) {
  			this.productCategories = data;
  			this.productCategories[0].name = '';
  		}
  	});
  }

  query() {

  	this.vjApi.queryDistributorInfo(this.keyword).subscribe((data) => {
  		console.log(data.json());
  		if(data.json().length > 0) {
  			this.distributors = data.json();
        this.tableDisplay = true;
  		}
  	}, (err) => {
  		console.log(err.status);
  	})
  }

  selected(event, i) {
  	this.distributorName = this.distributors[i].name;
    this.distributorId = this.distributors[i].id;

  	this.tableDisplay = false;
    this.productShow = true;

    // get inventory
   this.getDistributorInventory(this.distributorId);
  }

  getDistributorInventory(distributorId) {
    this.productInventories = [];
    this.vjApi.queryDistributorInventory(this.distributorId).subscribe((data) => {
      if(data.json().length > 0) {
        this.productInventories = data.json();
      }
    });   
  }

  catSelected(event) {
  	if(event.target.value > 1) {
  		this.vjApi.getProductSubCategoriesByProductCategoryId(event.target.value).subscribe((data) => {
  			console.log(data);
  			if(data) {
  				this.productSubCategories = data;
          this.subCategoryId = this.productSubCategories[0].id;
           console.log('xxxx', this.subCategoryId);
          this.inputQueryDisabled = false;
  			}
  		})
  	} else {
  		this.productSubCategories = [];
  	}

  }

  subCatSelected(event) {
    this.subCategoryId = event.target.value;
  }

  queryProduct() {
    this.vjApi.queryProductByKeywordAndCatId(this.keywordProduct,this.subCategoryId).subscribe((data) => {
      if(data.json()) {
        this.products = data.json();
        this.products.forEach((d) => {
        this.inventories.push(0);
        })
      }
    });
  }

  inventoryChange(index) {
    this.saveBtnDisabled = false;
  }

  increateInventory(index: number): void {
    console.log(this.inventories[index]);
    console.log(this.products[index].id);
    let body ={
      "distributor_id": this.distributorId,
      "product_id": this.products[index].id,
      "inventory": this.inventories[index]
    }

    this.vjApi.increateDistributorInventory(JSON.stringify(body)).subscribe((r) => console.log(r));

    //refresh inventory
    this.getDistributorInventory(this.distributorId);
    this.saveBtnDisabled = true;

  }
}
