import { Component, OnInit } from '@angular/core';

import { VJAPI } from '../../../services/vj.services';
import { Distributor } from '../../../models/distributor.model';
import { ProductCategory } from '../../../models/product-category';
import { ProductSubCategory } from '../../../models/product-sub-category';
import { Product } from '../../../models/product';
import { API_BASE_URL } from '../../../models/constants';

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
  categoryId: number;
  subCategoryId: number;
  distributorId: number;
  productId: number;

  distributors: Distributor[];
  productCategories: ProductCategory[];
  productSubCategories: ProductSubCategory[];
  products: Product[];
  inventories: number[];
  productInventories: Product[]

  filterProductCategories: ProductCategory[];
  filterProductSubCategories: ProductSubCategory[];
  filterProductInventories: Product[];
  filterCategoryId: number;
  filterSubCategoryId: number;
  filterKeyword: string;

  tableDisplay: boolean = false;
  productShow: boolean = false;
  saveBtnDisabled: boolean = true;
  filterBtnDisabled: boolean = true;

  constructor(private vjApi: VJAPI) { 
  	this.distributors = new Array<Distributor>();
  	this.productCategories = new Array<ProductCategory>();
  	this.productSubCategories = new Array<ProductSubCategory>(new ProductSubCategory());
    this.products = new Array<Product>();
    this.inventories = new Array<number>();
    this.productInventories = new Array<Product>();

    this.filterProductCategories = new Array<ProductCategory>();
    this.filterProductSubCategories = new Array<ProductSubCategory>();   
    this.filterProductInventories = new Array<Product>();
  }

  ngOnInit() {
  	this.vjApi.getProductCategory().subscribe((data) => {
  		if(data) {
  			this.productCategories = data;
  			this.productCategories[0].name = '';

        this.filterProductCategories = data;
  		}
  	});
  }

  query() {

  	this.vjApi.queryDistributorInfo(this.keyword).subscribe((data) => {
      this.distributors = [];
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
    this.filterBtnDisabled = false;

    // get inventory
   this.getDistributorInventory(this.distributorId);
  }

  getDistributorInventory(distributorId) {
    this.productInventories = [];
    this.vjApi.queryDistributorInventory(this.distributorId).subscribe((data) => {
      if(data.json().length > 0) {
        this.productInventories = data.json();
        this.filterProductInventories = this.productInventories;
      }
    });   
  }

  catSelected(event) {
    this.categoryId = event.target.value;
    this.subCategoryId = 0;
    this.keywordProduct = '';
  	if(event.target.value > 1) {
  		this.vjApi.getProductSubCategoriesByProductCategoryId(event.target.value).subscribe((data) => {
  			console.log(data);
  			if(data) {
          this.productSubCategories = new Array<ProductSubCategory>(new ProductSubCategory());
          for(let d of data) {
            this.productSubCategories.push(d);
          }
          this.filterSubCategoryId = this.productSubCategories[0].id;
  			}
  		})
  	} else {
  		this.productSubCategories = [];
  	}
  }

  subCatSelected(event) {
    this.subCategoryId = event.target.value;
  }

  filterCatSelected(event) {
    this.filterCategoryId = event.target.value;
    this.filterSubCategoryId = 0;
    this.keyword = '';
    if(event.target.value > 1) {
      this.vjApi.getProductSubCategoriesByProductCategoryId(event.target.value).subscribe((data) => {
        console.log(data);
        if(data) {
          this.filterProductSubCategories = new Array<ProductSubCategory>(new ProductSubCategory());
          for(let d of data) {
            this.filterProductSubCategories.push(d);
          }
        }
      })
    } else {
      this.filterProductSubCategories = [];
    }
  }

  filterSubCatSelect(event) {
      this.filterSubCategoryId = event.target.value;

  }

  queryInventory() {
    this.filterProductInventories = [];
    let body = {
      'distributorId': this.distributorId,
      'categoryId': this.filterCategoryId ? this.filterCategoryId : 0,
      'subCategoryId': this.filterSubCategoryId ? this.filterSubCategoryId : 0,
      'keyword': this.filterKeyword ? this.filterKeyword : ''
    }

    this.vjApi.queryDistributorInventoryByConditions(JSON.stringify(body)).subscribe((invt) => {
      console.log(invt);
      if(invt.length > 0) {
        this.filterProductInventories = invt;
      }
    });
  }

  queryProduct() {
    this.products = [];
    let body = {
      'categoryId': this.categoryId ? this.categoryId : 0,
      'subCategoryId': this.subCategoryId ? this.subCategoryId : 0,
      'keyword': this.keywordProduct ? this.keywordProduct : ''
    }

    this.vjApi.queryDistributorProductByConditions(JSON.stringify(body)).subscribe((p) => {
      console.log(p);
      if(p.length > 0) {
        this.products = p;
      }
    })
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

    this.vjApi.increateDistributorInventory(JSON.stringify(body)).subscribe((r) => {
      console.log(r)
    //refresh inventory
    this.getDistributorInventory(this.distributorId);
    this.saveBtnDisabled = true;
    });
  }
}
