import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { VJAPI } from '../../../services/vj.services';
import { ProductCategory } from '../../../models/product-category';
import { ProductSubCategory } from '../../../models/product-sub-category';
import { Product } from '../../../models/product';

import { API_BASE_URL } from '../../../models/Constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('checkbox') checkbox: ElementRef;

  productCategories: ProductCategory[];
  productSubCategories: ProductSubCategory[];
  products: Product[];

  image_url: string;
 
  isActive: boolean = false;

  selectedItemSet: any;
  swapBtnDisabled: boolean = true;
  updateBtnDisabled: boolean = true;
  currentDeleteIndex: number;
  currentSubcategoryId: number;
  swapList: number[];

  constructor(private vjApi: VJAPI) {
  	this.productCategories = new Array<ProductCategory>(new ProductCategory());
  	this.productSubCategories = new Array<ProductSubCategory>(new ProductSubCategory());
  	this.products =new Array<Product>(new Product());

  	this.image_url = API_BASE_URL;

    this.selectedItemSet = new Set();

    this.swapList = new Array<number>();
  }

  ngOnInit() {
  	this.vjApi.getProductCategoryForConsole().subscribe((data) => {
  		if(data) {
  			this.productCategories = data;
  		}
  	})
  }

  categorySelected(event) {
    let id = event.target.value;

    this.vjApi.getProductSubCategoriesByProductCategoryId(id).subscribe((data) => {
      if(data) {
        this.productSubCategories = data;
      }
    });
  }

  subCategorySelected(event) {
  	let id = event.target.value;
    this.populateData(id);
  }

  populateData(subCategoryId) {
    this.vjApi.getProductsBySubCategoryId(subCategoryId).subscribe((data) => {
      if(data) {
        console.log(data);
        this.products = data;
      }
    });
  }

  swap() {
    this.swapList = [];

    if(this.selectedItemSet.size == 2) {
      let iter = this.selectedItemSet.values();
      let i = iter.next().value;
      let j = iter.next().value;

      this.swapList.push(this.products[i].id);
      this.swapList.push(this.products[j].id);

      let temp = this.products[i].sort_order;
      this.products[i].sort_order = this.products[j].sort_order;
      this.products[j].sort_order = temp;

      this.updateBtnDisabled = false;
    } else {
      this.updateBtnDisabled = true;
    }
  }

  checkboxChecked(event, index) {
    if(event.target.checked) {
      this.selectedItemSet.add(index);
      this.isActive = true;
    } else {
      this.selectedItemSet.delete(index);
      this.isActive = false;
    }

    // checked the size of the Set
    if(this.selectedItemSet.size == 2) {
      this.swapBtnDisabled = false;
    } else {
      this.swapBtnDisabled = true;
    }
  }


  delete(index: number) {
    this.currentDeleteIndex = index;
    this.currentSubcategoryId = this.products[index].product_sub_category_id;
  }

  deleteConfirmed() {
    if(this.selectedItemSet.has(this.currentDeleteIndex)) this.selectedItemSet.delete(this.currentDeleteIndex);
    this.vjApi.deleteProductById(this.products[this.currentDeleteIndex].id).subscribe((data)=>console.log(data));
    this.populateData(this.currentSubcategoryId);
  }

  update() {
    this.updateBtnDisabled = true;
    this.selectedItemSet.forEach((value) => this.selectedItemSet.delete(value));
    this.vjApi.swapProductSortOrder(JSON.stringify(this.swapList)).subscribe((data)=>console.log(data));
    this.populateData(this.currentSubcategoryId);
  }
}
