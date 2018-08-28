import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductCategory } from '../../../models/product-category';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {
  form: FormGroup;
  productCategory = new ProductCategory();

  constructor(private fb: FormBuilder, private router: Router) { 

  }

  ngOnInit() {
  	this.form = this.fb.group({
  		name: ['', Validators.required],
  		description: [''],
  		sort_order: [99, Validators.required]
  	});

  }

  submit() {
  	this.productCategory.name = this.form.controls.name.value;
  	this.productCategory.description = this.form.controls.description.value;
  	console.log(this.productCategory);
  	this.router.navigate(['product/category']);

  }

}