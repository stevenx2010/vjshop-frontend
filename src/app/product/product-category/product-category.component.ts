import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductCategory } from '../../../models/product-category';
import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements AfterViewInit {

  @ViewChildren('checkbox') checkboxes : QueryList<ElementRef>;
  productCategories: ProductCategory[];
  selectedItems: number[];
  updateBtnDisabled: boolean = true;
  swapBtnDisabled: boolean = true;
  productCategoryIdSwapList: number[];
  rowSelected: boolean = false;
  rowIndexSelected: number;
  currentDeleteIndex: number;


  constructor(private vjApi: VJAPI, private router: Router, private route: ActivatedRoute) {
  	this.productCategories = new Array<ProductCategory>();
  	this.selectedItems = [];
  	this.productCategoryIdSwapList =[];

  }

  ngAfterViewInit() {
    this.populateData();
  }

  ngOnInit() {
    this.populateData();
  }

  populateData() {
     this.vjApi.getProductCategory().subscribe((data) => {
      if(data) {
        this.productCategories = data;
      }
    },
    (err) => (console.log(err)));   
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

  isNotEqual(element, index, array) {
    return (element != index);
  }

  swap() {
  	let i = this.selectedItems[0];
  	let j = this.selectedItems[1];

  	console.log('i', this.productCategories[i].id);
  	console.log('j', this.productCategories[j].id);

  	this.productCategoryIdSwapList.push(this.productCategories[i].id);
  	this.productCategoryIdSwapList.push(this.productCategories[j].id);

  	let temp = this.productCategories[i].sort_order;
  	this.productCategories[i].sort_order = this.productCategories[j].sort_order;
  	this.productCategories[j].sort_order = temp;

  	this.selectedItems = [];
  	this.checkboxes.forEach((item) => {
  		item.nativeElement.checked = false;
  	});

  	this.updateBtnDisabled = false;
  	this.swapBtnDisabled = true;
  }

  update() {
  	this.updateBtnDisabled = true;

  	this.vjApi.swapProductCategorySortOrder(this.productCategoryIdSwapList).subscribe((data) => console.log(data));
    this.populateData();
  }

  add() {
    this.router.navigate(['./add'], {relativeTo: this.route});
  }

  edit(index: number) {
    this.router.navigate(['edit/' + this.productCategories[index].id], {relativeTo: this.route});
  }

  delete(index: number) {
    this.currentDeleteIndex = index;
  }

  deleteConfirmed() {
   // console.log(this.productCategories[this.currentDeleteIndex]);
   // console.log(this.productCategories[this.currentDeleteIndex].id);
    this.vjApi.deleteProductCategoryById(this.productCategories[this.currentDeleteIndex].id).subscribe((data)=>console.log(data));
    this.populateData();
  }
}
