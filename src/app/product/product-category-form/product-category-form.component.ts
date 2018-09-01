import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductCategory } from '../../../models/product-category';
import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {
  title: string = '新增产品分类';
  formFunction: string = 'add';
  form: FormGroup;
  productCategory: ProductCategory[];
  productId: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private vjApi: VJAPI) { 
    this.productCategory = new Array<ProductCategory>();
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		name: ['', Validators.required],
  		description: [''],
  		sort_order: [99, Validators.compose([Validators.required, Validators.min(2), Validators.pattern('^[0-9]{1,2}$')])]
  	});

    // get parameters transfer: if no parameter, adding a new, otherwise, edit current
    this.productId = this.activatedRoute.snapshot.params['id'];
    if(this.productId) {
      this.vjApi.getProductCategoryById(this.productId).subscribe((data) => {
        if(data) {
          this.title = '编辑产品分类';
          this.formFunction = 'edit';
          this.productCategory = data;
          console.log(this.productCategory);
          this.form.get('name').setValue(this.productCategory[0].name);
          this.form.get('description').setValue(this.productCategory[0].description);
          this.form.get('sort_order').setValue(this.productCategory[0].sort_order);
        } else {
          this.title = '新增产品分类';
        }
      })
    } 
  }

  submit() {

    if(this.formFunction == 'edit') {
      this.productCategory[0].name = this.form.controls.name.value;
      this.productCategory[0].description = this.form.controls.description.value;
      this.productCategory[0].sort_order = this.form.controls.sort_order.value;
      this.vjApi.updateProductCategory(JSON.stringify(this.productCategory[0])).subscribe((data)=>console.log(data));
    }
    else {
      this.productCategory = new Array<ProductCategory>(new ProductCategory());
      this.productCategory[0].name = this.form.controls.name.value;
      this.productCategory[0].description = this.form.controls.description.value;
      this.productCategory[0].sort_order = this.form.controls.sort_order.value;     
      this.vjApi.updateProductCategory(JSON.stringify(this.productCategory[0])).subscribe((data)=>console.log(data));   
     }
  	
  	this.router.navigate(['product/category']);
  }

}