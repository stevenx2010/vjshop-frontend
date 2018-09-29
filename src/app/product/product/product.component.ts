import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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

  selectedCategoryId: number;
  selectedSubCategoryId: number;
  keyword: string;

  constructor(private vjApi: VJAPI, private router: Router) {
  	this.productCategories = new Array<ProductCategory>(new ProductCategory());
  	
  	this.products =new Array<Product>(new Product());

  	this.image_url = API_BASE_URL;

    this.selectedItemSet = new Set();

    this.swapList = new Array<number>();
  }

  ngOnInit() {
  	this.vjApi.getProductCategoryForConsole().subscribe((data) => {
  		if(data) {
        for(let d of data) {
  			  this.productCategories.push(d);
        }
  		}
  	})
  }

  categorySelected(event) {
    let id = event.target.value;
    this.selectedCategoryId = id;
    console.log(id);

    this.vjApi.getProductSubCategoriesByProductCategoryId(id).subscribe((data) => {
      if(data) {
        this.productSubCategories = new Array<ProductSubCategory>(new ProductSubCategory());
        for(let d of data) {
          this.productSubCategories.push(d);
        }
      }
    });
  }

  subCategorySelected(event) {
  	let id = event.target.value;
    this.selectedSubCategoryId = id;
    console.log(id);

 //   this.populateData(id);
  }

  query() {
    this.products = [];
    if(this.keyword && this.keyword.length == 0) {
      this.keyword = '';
      console.log('xxxxxxxxxxxx');
    }
    console.log(this.selectedCategoryId);
    console.log(this.keyword);
    /**************************************
     *      Query Conditions
     * 1. a == null, c == null
     * 2. a == null, c != null
     * 3. a != null, b == null, c == null
     * 4. a != null, b == null, c != null
     * 5. a != null, b != null, c == null
     * 6. a != null, b != null, c != null
     ***************************************/

    // a == null
    if(this.selectedCategoryId == null || this.selectedCategoryId == 0) {
      // b == null && c == null
      if(this.keyword == null || (this.keyword != null && this.keyword.length == 0)) {
        this.vjApi.queryProductAll().subscribe((p) => {
          if(p.length > 0) {
            this.products = p;
          }
        })
      } else if(this.keyword != null) {  // b == null && c !=null
        this.vjApi.queryByKeyword(this.keyword.trim()).subscribe((p) => {
          if(p.length > 0) {
            this.products = p;
          }
        })
      }
    } else if(this.selectedCategoryId != null) {    // a != null
      if(this.selectedSubCategoryId == null || this.selectedSubCategoryId == 0) {      // b == null
        if(this.keyword == null || (this.keyword != null && this.keyword.length == 0)) {    // c == null
          this.vjApi.queryProductByCategoryId(this.selectedCategoryId).subscribe((p) => {
            if(p.length > 0) {
              this.products = p;
            }
          })
        } else if(this.keyword != null) {    // c != null
          this.vjApi.queryProductByKeywordAndCatId(this.keyword.trim(), this.selectedCategoryId).subscribe((p) => {
            if(p.length > 0) {
              this.products = p;
            }
          })
        }
      } else if(this.selectedSubCategoryId != null || this.selectedSubCategoryId != 0) {    // b != null
        if(this.keyword == null || (this.keyword != null && this.keyword.length == 0)) {    // c == null
          this.populateData(this.selectedSubCategoryId);
        }
        else if(this.keyword != null) {    // c != null
          this.vjApi.queryProductByKeywordAndSubCatId(this.keyword, this.selectedSubCategoryId).subscribe((p) => {
            if(p.json().length > 0) {
              this.products = p.json();
            }
          })
        }
      }

    }
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

  edit(index: number) {
    this.router.navigate(['/product/product/edit/' + this.products[index].id]);
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
