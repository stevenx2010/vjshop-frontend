import { Component, OnInit, ViewChildren, ElementRef, QueryList} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ProductSubCategory } from '../../../models/product-sub-category';
import { ProductCategory } from '../../../models/product-category';
import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-product-sub-category',
  templateUrl: './product-sub-category.component.html',
  styleUrls: ['./product-sub-category.component.css']
})
export class ProductSubCategoryComponent implements OnInit {
  @ViewChildren('checkbox') checkboxes : QueryList<ElementRef>;	
  productCategories: ProductCategory[];
  productSubCategories: ProductSubCategory[];

  rowIndexSelected: number;
  rowSelected: boolean = false;
  selectedItems: number[];

  updateBtnDisabled: boolean = true;
  swapBtnDisabled: boolean = true;
  addBtnDisabled: boolean = true;

  productSubCategoryIdSwapList: number[];

  currentSelectedCategoryId: number = 0;
  currentDeleteIndex: number;

  constructor(private vjApi: VJAPI, private router: Router, private route: ActivatedRoute) {
  	this.productCategories = new Array<ProductCategory>();
  	this.productSubCategories = new Array<ProductSubCategory>();
  	this.selectedItems = [];
  	this.productSubCategoryIdSwapList = [];
  }

  ngOnInit() {
  	this.vjApi.getProductCategory().subscribe((data) =>
  		{	
  			if(data) {
  				this.productCategories = data;
  			}
  		}
  	);
  }

  onSelect(event) {

  	let categoryId = event.target.value;
  	this.currentSelectedCategoryId = categoryId;
  	this.vjApi.getProductSubCategoriesByProductCategoryId(categoryId).subscribe((data) => {
  		if(data) {
  			this.productSubCategories = data;
  			this.addBtnDisabled = false;
  		} else
  			this.addBtnDisabled = true;
  	})
  }

  populateData() {
  	this.vjApi.getProductSubCategoriesByProductCategoryId(this.currentSelectedCategoryId).subscribe((data) => {
  		if(data) {
  			this.productSubCategories = data;
  		}
  	});  	
  }

  add() {
  	console.log(this.currentSelectedCategoryId);
  	this.router.navigate(['./add/' + this.currentSelectedCategoryId], {relativeTo: this.route});
  }

  edit(index: number) {
	  this.router.navigate(['edit/' + this.productSubCategories[index].id], {relativeTo: this.route});
  }

  delete(index: number) {
    this.currentDeleteIndex = index;
  }

  deleteConfirmed() {
    this.vjApi.deleteProductSubCategoryById(this.productSubCategories[this.currentDeleteIndex].id).subscribe((data)=>console.log(data));
    this.populateData();
  }

    selectionChange(event, index): void {
  //	console.log(index);
  //	console.log(event.currentTarget.checked);
    this.rowIndexSelected = index;

  	if(event.currentTarget.checked) {
  		this.selectedItems.push(index);
      this.rowSelected = true;
  	} else {
      let tempItems:number[] = [];
      for(let item of this.selectedItems) {
        if(item != index) {
          tempItems.push(item);
        }
      }
      this.selectedItems = tempItems;
      this.rowSelected = false;
    }

    if(this.selectedItems.length === 2) this.swapBtnDisabled = false;
    else this.swapBtnDisabled = true;

  }

   swap() {
  	let i = this.selectedItems[0];
  	let j = this.selectedItems[1];

  	this.productSubCategoryIdSwapList.push(this.productSubCategories[i].id);
  	this.productSubCategoryIdSwapList.push(this.productSubCategories[j].id);

  	let temp = this.productSubCategories[i].sort_order;
  	this.productSubCategories[i].sort_order = this.productSubCategories[j].sort_order;
  	this.productSubCategories[j].sort_order = temp;

  	this.selectedItems = [];
  	this.checkboxes.forEach((item) => {
  		item.nativeElement.checked = false;
  	});

  	this.updateBtnDisabled = false;
  	this.swapBtnDisabled = true;
  }

  update() {
  	this.updateBtnDisabled = true;

  	this.vjApi.swapProductSubCategorySortOrder(this.productSubCategoryIdSwapList).subscribe((data) => console.log(data));
    this.populateData();
  }



}
