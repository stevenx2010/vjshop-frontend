import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { ProductCategory } from '../../../models/product-category';
import { ProductSubCategory } from '../../../models/product-sub-category';


@Component({
  selector: 'app-product-sub-category-form',
  templateUrl: './product-sub-category-form.component.html',
  styleUrls: ['./product-sub-category-form.component.css']
})
export class ProductSubCategoryFormComponent implements OnInit {
  @Input() formFunction: string = 'add';
  @Input() id: number = 0;
  @Output() finished = new EventEmitter<boolean>();

  form: FormGroup;
  productCategory: ProductCategory[];
  productSubCategory: ProductSubCategory[];
  productCategoryId: number;
  productSubCategoryId: number;
  
  title: string = '新增产品分类子类';

  constructor(private fb: FormBuilder, private vjApi: VJAPI, private activatedRoute: ActivatedRoute, private router: Router) {
  	this.productCategory = new Array<ProductCategory>(new ProductCategory());
  	this.productSubCategory = new Array<ProductSubCategory>(new ProductSubCategory());
  }

  ngOnInit() {
    this.productCategoryId = this.id;
    this.productSubCategoryId = this.id;

  	// step 1: create the form
  	this.form = this.fb.group({
  		name: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
  		description: [''],
  		sort_order: [99, Validators.compose([Validators.required, Validators.min(0), Validators.pattern('^[0-9]{1,2}$')])]
  	});

  	// step 2: check the function of this form: 'add' or 'edit'
  	let urls = this.activatedRoute.snapshot.url;
  	for(let url of urls)  {
  		if(url.path == 'edit') {
  			this.formFunction = 'edit';
  			break;
  		}
  	}

  	// step 3: retrieve the related product category by id if it's 'add', else 
  	if(this.formFunction == 'add') {
	 // 	this.productCategoryId = this.activatedRoute.snapshot.params['id'];
		  this.vjApi.getProductCategoryById(this.productCategoryId).subscribe((data) => {
	 		if(data) {
		  		this.productCategory = data;
		  	}
		});
  	} else  {
  		this.title = '编辑产品分类子类';
  		// get Product Sub Category data
  		//this.productSubCategoryId = this.activatedRoute.snapshot.params['id'];

  		this.vjApi.getProductSubCategoriesByProductSubCategoryId(this.productSubCategoryId).subscribe(
  			(data)=>{
	  			this.productSubCategory = data;
	  			this.productCategoryId = this.productSubCategory[0].product_category_id;
	  			
	  			this.vjApi.getProductCategoryById(this.productCategoryId).subscribe((data) => {
			 		if(data) {
				  		this.productCategory = data;
				  	}
				});
 

		  		// step 4: if it's edit, fill the form
			  	this.form.get('name').setValue(this.productSubCategory[0].name);
			  	this.form.get('description').setValue(this.productSubCategory[0].description);
			  	this.form.get('sort_order').setValue(this.productSubCategory[0].sort_order);
 		});
  	}
  }

  submit() {
  	this.productSubCategory[0].product_category_id = this.productCategoryId;
  	this.productSubCategory[0].name = this.form.controls.name.value;
  	this.productSubCategory[0].description = this.form.controls.description.value;
  	this.productSubCategory[0].sort_order = this.form.controls.sort_order.value;

  	this.vjApi.updateOrCreateProductSubCategory(JSON.stringify(this.productSubCategory[0])).subscribe((data)=>
      {
        console.log(data);
        this.finished.emit(true);      
     });

  	// back to previous page
  	//this.goBack()
  	
  }

  goBack() {
	 //this.router.navigate(['product/subcategory']);
   this.finished.emit(false);
  } 	
}
